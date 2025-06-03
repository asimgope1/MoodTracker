import React, { JSX, useEffect, useRef, useState } from "react";
import { Image } from "expo-image";
import {
	View,
	StatusBar as RNStatusBar,
	FlatList,
	TouchableOpacity,
	Text,
	ListRenderItemInfo,
	Animated,
	Dimensions,
	Easing,
	ActivityIndicator,
	ScrollView,
	Modal,
	Alert,
	TextInput,
	Button,
	Pressable,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StatusBar } from "expo-status-bar";
import { styles } from "../../styles/HomeScreen.styles";
import { Ionicons } from "@expo/vector-icons";
import { useVideoPlayer, VideoView } from "expo-video";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

interface BurstEmoji {
	id: number;
	emoji: string;
	animation: Animated.ValueXY;
	opacity: Animated.Value;
	rotation: Animated.Value;
}

export function MoodSelector() {
	const [selectedMood, setSelectedMood] = useState<number | null>(null);
	const [burstEmojis, setBurstEmojis] = useState<BurstEmoji[]>([]);
	const circlePositions = useRef<{ [key: number]: { x: number; y: number } }>(
		{},
	);

	const startBurst = (emoji: string, index: number) => {
		const pos = circlePositions.current[index];
		if (!pos) return;

		const newEmojis: BurstEmoji[] = [];
		const burstCount = 12; // Reduced for better performance

		for (let i = 0; i < burstCount; i++) {
			const animation = new Animated.ValueXY({ x: 0, y: 0 });
			const opacity = new Animated.Value(1);
			const rotation = new Animated.Value(0);

			const angle = Math.random() * Math.PI * 2;
			const distance = 80 + Math.random() * 40;

			Animated.parallel([
				Animated.timing(animation, {
					toValue: {
						x: Math.cos(angle) * distance,
						y: Math.sin(angle) * distance,
					},
					duration: 800,
					easing: Easing.out(Easing.exp),
					useNativeDriver: true,
				}),
				Animated.timing(opacity, {
					toValue: 0,
					duration: 800,
					useNativeDriver: true,
				}),
				Animated.timing(rotation, {
					toValue: Math.random() > 0.5 ? 1 : -1,
					duration: 400,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
			]).start(() => {
				// setBurstEmojis((prev) => prev.filter((e) => e.id !== id));
			});

			newEmojis.push({
				id: Date.now() + i,
				emoji,
				animation,
				opacity,
				rotation,
			});
		}

		setBurstEmojis(newEmojis);
		setSelectedMood(index);
	};

	return (
		<View style={{ minHeight: 120, marginTop: 8 }}>
			<View style={styles.moodCirclesContainer}>
				{["😞", "😐", "🙂", "😊", "😄"].map((emoji, index) => {
					const isSelected = selectedMood === index;
					return (
						<TouchableOpacity
							key={index}
							onPress={() => startBurst(emoji, index)}
							style={[
								styles.moodCircle,
								isSelected && styles.moodCircleSelected,
							]}
							onLayout={(event) => {
								const { x, y, width, height } = event.nativeEvent.layout;
								circlePositions.current[index] = {
									x: x + width / 2,
									y: y + height / 2,
								};
							}}>
							<Text style={styles.emoji}>{emoji}</Text>
						</TouchableOpacity>
					);
				})}
			</View>

			{/* Burst emojis container */}
			<View style={styles.burstContainer}>
				{burstEmojis.map(({ id, emoji, animation, opacity, rotation }) => (
					<Animated.Text
						key={id}
						style={[
							styles.burstEmoji,
							{
								opacity,
								transform: [
									...animation.getTranslateTransform(),
									{
										rotate: rotation.interpolate({
											inputRange: [-1, 1],
											outputRange: ["-0.2rad", "0.2rad"],
										}),
									},
									{
										scale: opacity.interpolate({
											inputRange: [0, 1],
											outputRange: [0.8, 1.2],
										}),
									},
								],
							},
						]}>
						{emoji}
					</Animated.Text>
				))}
			</View>
		</View>
	);
}

interface ActivityItem {
	id: number;
	title: string;
	description: string;
}

export default function HomeScreen(): JSX.Element {
	const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(
		null,
	);
	const [modalVisible, setModalVisible] = useState(false);
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const scaleAnim = useRef(new Animated.Value(0.9)).current;

	const activities: ActivityItem[] = [
		{
			id: 1,
			title: "Breathing Exercise",
			description: "Calm your mind with focused breathing",
			duration: "5 min",
			steps: [
				"Find a comfortable seated position",
				"Close your eyes and relax your shoulders",
				"Inhale deeply through your nose for 4 seconds",
				"Hold your breath for 2 seconds",
				"Exhale slowly through your mouth for 6 seconds",
				"Repeat for 5 minutes",
			],
			videoUri: "https://example.com/breathing-exercise.mp4",
		},
		{
			id: 2,
			title: "Body Scan",
			description: "Bring awareness to each part of your body",
			duration: "10 min",
			steps: [
				"Lie down in a comfortable position",
				"Close your eyes and take 3 deep breaths",
				"Bring attention to your toes, notice any sensations",
				"Slowly move your awareness up through your body",
				"Notice each body part without judgment",
				"Release tension as you scan upward",
				"Finish by bringing awareness to your whole body",
			],
			videoUri: "https://example.com/body-scan.mp4",
		},
		{
			id: 3,
			title: "Guided Meditation",
			description: "A journey to inner peace and clarity",
			duration: "15 min",
			steps: [
				"Sit comfortably with your spine straight",
				"Rest your hands on your knees",
				"Follow the guide's voice as it leads you",
				"Notice thoughts but let them pass like clouds",
				"Focus on the present moment",
				"Return your focus gently when distracted",
				"End with gratitude for this moment",
			],
			videoUri: "https://example.com/guided-meditation.mp4",
		},
	];

	const openModal = (activity: ActivityItem) => {
		setSelectedActivity(activity);
		setModalVisible(true);
		// Reset animations
		fadeAnim.setValue(0);
		scaleAnim.setValue(0.9);

		// Animate in
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				easing: Easing.out(Easing.ease),
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnim, {
				toValue: 1,
				duration: 300,
				easing: Easing.out(Easing.back(1.5)),
				useNativeDriver: true,
			}),
		]).start();
	};

	const closeModal = () => {
		Animated.parallel([
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true,
			}),
			Animated.timing(scaleAnim, {
				toValue: 0.9,
				duration: 200,
				useNativeDriver: true,
			}),
		]).start(() => {
			setModalVisible(false);
			setSelectedActivity(null);
		});
	};

	// utils/fetchQuote.ts

	const fetchRandomQuote = async () => {
		try {
			const response = await fetch(
				"https://the-personal-quotes.p.rapidapi.com/quotes/random",
				{
					method: "GET",
					headers: {
						"x-rapidapi-key":
							"a5af6e0960msh721e08cf3cc23abp17cf0bjsn3c4a3746374e",
						"x-rapidapi-host": "the-personal-quotes.p.rapidapi.com",
					},
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data; // { quote, author, tags }
		} catch (error) {
			console.error("Failed to fetch quote:", error);
			return null;
		}
	};

	const [quoteData, setQuoteData] = useState<{
		quote: string;
		author: string;
	} | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadQuote = async () => {
			setLoading(true);

			try {
				const stored = await AsyncStorage.getItem("dailyQuote");
				const today = new Date().toISOString().split("T")[0]; // e.g., "2025-06-03"

				if (stored) {
					const parsed = JSON.parse(stored);
					if (parsed.date === today) {
						setQuoteData(parsed.quoteData);
						setLoading(false);
						return;
					}
				}

				const data = await fetchRandomQuote();
				if (data) {
					const newEntry = {
						date: today,
						quoteData: {
							quote: data.quote,
							author: data.author,
						},
					};
					await AsyncStorage.setItem("dailyQuote", JSON.stringify(newEntry));
					setQuoteData(newEntry.quoteData);
				}
			} catch (error) {
				console.error("Error loading/storing daily quote:", error);
			}

			setLoading(false);
		};

		loadQuote();
	}, []);

	const getGreeting = (): string => {
		const hour = new Date().getHours();
		if (hour < 12) return "Good Morning";
		if (hour < 17) return "Good Afternoon";
		if (hour < 20) return "Good Evening";
		return "Good Night";
	};

	const [text, setText] = useState("");
	const [showBanner, setShowBanner] = useState(false);

	const saveEntry = async () => {
		if (!text.trim()) {
			alert("Please write something.");
			return;
		}
		const timestamp = new Date().toISOString();
		const entry = { text, timestamp };

		try {
			const existing = await AsyncStorage.getItem("journalEntries");
			const entries = existing ? JSON.parse(existing) : [];
			entries.unshift(entry);
			await AsyncStorage.setItem("journalEntries", JSON.stringify(entries));
			setText("");
			setShowBanner(true);
			setTimeout(() => setShowBanner(false), 2000); // Hide after 2 seconds
		} catch (err) {
			console.error("Save error", err);
			Alert.alert("Error", "Could not save entry.");
		}
	};

	const renderItem = ({ item }: ListRenderItemInfo<ActivityItem>) => (
		<ThemedView style={styles.featureCard}>
			<View style={styles.cardImageContainer}>
				<Image
					source={require("@/assets/images/meditation.png")}
					style={styles.cardImage}
					contentFit='cover'
				/>
				<View style={styles.imageOverlay} />
			</View>
			<View style={styles.cardContent}>
				<ThemedText type='title'>{item.title}</ThemedText>
				<ThemedText style={styles.cardDescription}>
					{item.description}
				</ThemedText>
				<TouchableOpacity
					style={styles.cardBadge}
					onPress={() => openModal(item)}>
					<ThemedText style={styles.badgeText}>Start</ThemedText>
					<Ionicons name='play' size={12} color='white' />
				</TouchableOpacity>
			</View>
		</ThemedView>
	);

	return (
		<>
			<StatusBar style='dark' translucent={true} />
			<View style={styles.statusBarBackground} />

			<View style={{ flex: 1 }}>
				<ParallaxScrollView
					headerBackgroundColor={{ light: "#5E8BAA", dark: "#0F2D37" }}
					headerImage={
						<Image
							source={require("@/assets/images/meditation.png")}
							style={styles.reactLogo}
							contentFit='cover'
						/>
					}>
					{/* Welcome Header */}
					<View style={styles.headerContainer}>
						<ThemedText type='title'>{getGreeting()}</ThemedText>

						<ThemedText style={styles.subtitle}>
							Let's start your mindfulness journey
						</ThemedText>
					</View>

					{/* Mood Section */}
					<ThemedView style={styles.sectionContainer}>
						<ThemedText type='title' style={styles.sectionTitle}>
							Today's Mood
						</ThemedText>
						<ThemedText style={styles.sectionDescription}>
							How are you feeling today?
						</ThemedText>
						<MoodSelector />
					</ThemedView>

					{/* Journal Section */}
					<ThemedView style={styles.sectionContainer}>
						{showBanner && (
							<View style={styles.banner}>
								<Text>Entry saved successfully</Text>
							</View>
						)}
						<ThemedText type='title' style={styles.sectionTitle}>
							Journal Entry
						</ThemedText>
						<ThemedText style={styles.sectionDescription}>
							Write a few thoughts from your day
						</ThemedText>
						<TextInput
							multiline
							placeholder='Start writing...'
							placeholderTextColor={"grey"}
							style={styles.input}
							value={text}
							onChangeText={setText}
						/>
						<Pressable style={styles.saveButton} onPress={saveEntry}>
							<Text style={styles.saveButtonText}>Save Entry</Text>
						</Pressable>
					</ThemedView>

					{/* Quote Section */}
					<ThemedView style={styles.sectionContainer}>
						<ThemedText type='title' style={styles.sectionTitle}>
							Daily Inspiration
						</ThemedText>

						<View style={styles.quoteCard}>
							{loading ? (
								<ActivityIndicator size='large' color={"yellow"} />
							) : quoteData ? (
								<>
									<ThemedText style={styles.quoteText}>
										"{quoteData.quote}"
									</ThemedText>
									<ThemedText style={styles.quoteAuthor}>
										— {quoteData.author}
									</ThemedText>
								</>
							) : (
								<ThemedText style={styles.quoteText}>
									Could not load quote. Try again later.
								</ThemedText>
							)}
						</View>
					</ThemedView>

					{/* Features Carousel */}
					<ThemedText
						type='title'
						style={[
							styles.sectionTitle,
							{ marginHorizontal: 24, marginTop: 24 },
						]}>
						Mindfulness Activities
					</ThemedText>

					<FlatList
						data={activities}
						keyExtractor={(item) => item.id.toString()}
						renderItem={renderItem}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{
							paddingHorizontal: 24,
							paddingVertical: 16,
						}}
					/>

					<Modal
						visible={modalVisible}
						transparent
						animationType='none'
						onRequestClose={closeModal}>
						<View style={styles.modalBackdrop}>
							<Animated.View
								style={[
									styles.modalContainer,
									{
										opacity: fadeAnim,
										transform: [{ scale: scaleAnim }],
									},
								]}>
								{selectedActivity && (
									<>
										{/* Close Button */}
										<TouchableOpacity
											style={styles.closeButton}
											onPress={closeModal}>
											<Ionicons name='close' size={28} color='#5E8BAA' />
										</TouchableOpacity>

										{/* Video Preview */}
										<View style={styles.videoContainer}>
											{/* play icon only */}
											<Ionicons
												name='play-circle'
												size={55}
												color='#5E8BAA'
												// style={styles.videoPlayer}
											/>

											<View style={styles.videoOverlay} />
										</View>

										{/* Activity Details */}
										<ScrollView
											style={styles.modalContent}
											showsVerticalScrollIndicator={false}>
											<View style={styles.activityHeader}>
												<ThemedText type='title' style={styles.modalTitle}>
													{selectedActivity.title}
												</ThemedText>
												<View style={styles.durationBadge}>
													<Ionicons
														name='time-outline'
														size={16}
														color='#5E8BAA'
													/>
													<ThemedText style={styles.durationText}>
														{selectedActivity.duration}
													</ThemedText>
												</View>
											</View>

											<ThemedText style={styles.activityDescription}>
												{selectedActivity.description}
											</ThemedText>

											{/* Steps Section */}
											<ThemedText type='title' style={styles.sectionHeader}>
												Steps
											</ThemedText>

											{selectedActivity.steps.map((step, index) => (
												<View key={index} style={styles.stepItem}>
													<View style={styles.stepNumber}>
														<ThemedText style={styles.stepText}>
															{index + 1}
														</ThemedText>
													</View>
													<ThemedText style={styles.stepDescription}>
														{step}
													</ThemedText>
												</View>
											))}

											{/* Start Button */}
											<TouchableOpacity
												style={styles.startButton}
												onPress={() => console.log("Starting meditation")}>
												<Ionicons name='play-circle' size={28} color='white' />
												<ThemedText style={styles.startButtonText}>
													Start Meditation
												</ThemedText>
											</TouchableOpacity>
										</ScrollView>
									</>
								)}
							</Animated.View>
						</View>
					</Modal>
				</ParallaxScrollView>
			</View>
		</>
	);
}
