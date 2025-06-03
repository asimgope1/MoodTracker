import React, { useEffect } from "react";
import {
	Image,
	Platform,
	StyleSheet,
	TouchableOpacity,
	AccessibilityInfo,
	GestureResponderEvent,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router } from "expo-router";

const TabTwoScreen: React.FC = () => {
	useEffect(() => {
		AccessibilityInfo.announceForAccessibility(
			"Explore Mindfulness screen loaded",
		);
	}, []);

	const handleJournalPress = (event: GestureResponderEvent) => {
		router.push("../daily-journals");
	};

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#E6F2EF", dark: "#1C1F1E" }}
			headerImage={
				<IconSymbol
					size={310}
					color='#A0CFC5'
					name='leaf'
					style={styles.headerImage}
					accessibilityRole='image'
					accessibilityLabel='Decorative leaf icon for mindfulness'
					importantForAccessibility='no-hide-descendants'
				/>
			}
			accessibilityRole='scrollbar'
			accessibilityLabel='Mindfulness content with sections'>
			<ThemedView style={styles.titleContainer}>
				<ThemedText
					type='title'
					accessibilityRole='header'
					accessibilityLevel={1}>
					Explore Mindfulness
				</ThemedText>
			</ThemedView>

			<ThemedText style={styles.introText}>
				Nurture your mental well-being with guided journaling, calming quotes,
				and mood reflections.
			</ThemedText>

			<Collapsible title='Mood Tracking'>
				<ThemedText>
					Track your emotions daily and visualize trends in your well-being.
					Mood tracking helps build self-awareness and emotional resilience.
				</ThemedText>
			</Collapsible>

			<Collapsible title='Daily Journaling'>
				<ThemedText>
					Write down your thoughts and feelings in a safe space. Journaling
					encourages mindfulness and clarity.
				</ThemedText>
				<TouchableOpacity
					onPress={handleJournalPress}
					accessibilityRole='link'
					accessibilityHint='Navigates to your journal entries'
					style={styles.linkTouchable}
					activeOpacity={0.7}>
					<ThemedText style={styles.linkText}>
						Your journals are here →
					</ThemedText>
				</TouchableOpacity>
			</Collapsible>

			<Collapsible title='Inspirational Quotes'>
				<ThemedText>
					Start your day with calming and inspiring words curated to support
					your mindfulness journey.
				</ThemedText>
				{/* Optionally add image with alt text */}
				{/* <Image
          source={require("@/assets/images/mindful-quote.png")}
          style={styles.quoteImage}
          accessibilityRole="image"
          accessibilityLabel="Inspirational quote illustration"
        /> */}
			</Collapsible>

			<Collapsible title='Wellness Tips'>
				<ThemedText>
					Get helpful tips on breathing exercises, grounding techniques, and
					ways to manage stress effectively.
				</ThemedText>
				<ExternalLink href='https://www.headspace.com/mindfulness'>
					<ThemedText type='link'>What is mindfulness?</ThemedText>
				</ExternalLink>
			</Collapsible>

			<Collapsible title='Themes & Accessibility'>
				<ThemedText>
					Enjoy light and dark themes designed to reduce eye strain and support
					your environment. Fully accessible and calming UI.
				</ThemedText>
			</Collapsible>

			<Collapsible title='Gentle Animations'>
				<ThemedText>
					Our animations are designed to be subtle and soothing, enhancing your
					experience without distraction.
				</ThemedText>
				{Platform.select({
					ios: (
						<ThemedText>
							Try the parallax header on iOS for a subtle depth effect as you
							scroll.
						</ThemedText>
					),
				})}
			</Collapsible>
		</ParallaxScrollView>
	);
};

const styles = StyleSheet.create({
	headerImage: {
		color: "#A0CFC5",
		bottom: -90,
		left: -35,
		position: "absolute",
	},
	titleContainer: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 8,
	},
	introText: {
		marginBottom: 16,
		fontSize: 16,
		lineHeight: 24,
	},
	linkTouchable: {
		marginTop: 8,
	},
	linkText: {
		color: "#2196F3",
		fontWeight: "600",
	},
	quoteImage: {
		alignSelf: "center",
		height: 100,
		width: 100,
		marginTop: 12,
	},
});

export default TabTwoScreen;
