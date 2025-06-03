import React, { useEffect, useState } from "react";
import {
	FlatList,
	StyleSheet,
	View,
	ListRenderItem,
	Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@react-navigation/native";

type JournalEntry = {
	text: string;
	timestamp: number;
};

const { width } = Dimensions.get("window");

const DailyJournals: React.FC = () => {
	const [entries, setEntries] = useState<JournalEntry[]>([]);
	const { colors } = useTheme();

	useEffect(() => {
		const loadEntries = async () => {
			try {
				const stored = await AsyncStorage.getItem("journalEntries");
				if (stored) {
					const parsed: JournalEntry[] = JSON.parse(stored);
					setEntries(parsed.reverse()); // latest first
				}
			} catch (error) {
				console.error("Failed to load entries:", error);
			}
		};

		loadEntries();
	}, []);

	const renderItem: ListRenderItem<JournalEntry> = ({ item }) => (
		<View
			style={[
				styles.entryCard,
				{ backgroundColor: colors.card, shadowColor: colors.border },
			]}
			accessible={true}
			accessibilityLabel={`Journal entry from ${new Date(
				item.timestamp,
			).toLocaleDateString()}`}>
			<ThemedText style={styles.timestamp} accessibilityRole='text'>
				{new Date(item.timestamp).toLocaleString(undefined, {
					weekday: "short",
					month: "short",
					day: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				})}
			</ThemedText>
			<ThemedText style={styles.text}>{item.text}</ThemedText>
		</View>
	);

	return (
		<ThemedView style={styles.container} accessibilityRole='list'>
			{entries.length === 0 ? (
				<ThemedText
					style={styles.emptyState}
					accessibilityLiveRegion='polite'
					accessibilityRole='text'>
					No journal entries yet. Start writing today ✍️
				</ThemedText>
			) : (
				<FlatList
					data={entries}
					keyExtractor={(_, index) => index.toString()}
					renderItem={renderItem}
					contentContainerStyle={{ paddingBottom: 20 }}
					showsVerticalScrollIndicator={false}
					accessibilityRole='list'
				/>
			)}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "transparent",
	},

	entryCard: {
		padding: 16,
		marginBottom: 12,
		borderRadius: 16,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 4,
		width: width - 32,
		alignSelf: "center",
	},

	timestamp: {
		fontSize: 13,
		color: "#888",
		marginBottom: 6,
		fontStyle: "italic",
	},

	text: {
		fontSize: 16,
		color: "#888",
		lineHeight: 22,
	},

	emptyState: {
		textAlign: "center",
		fontSize: 16,
		color: "#999",
		marginTop: 40,
	},
});

export default DailyJournals;
