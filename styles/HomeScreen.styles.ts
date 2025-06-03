import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    statusBarBackground: {
        height: Platform.OS === "android" ? 0 : 40,
        backgroundColor: "#0F2D37",
    },
    headerContainer: {
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.8,
        marginTop: 4,
    },
    sectionContainer: {
        width: "105%",
        borderRadius: 20,
        padding: 20,
        // marginHorizontal: -16,
        marginBottom: 20,
        backgroundColor: "rgba(255,255,255,0.1)",
    },
    sectionTitle: {
        fontSize: 18,
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        opacity: 0.7,
        marginBottom: 16,
    },
    moodCirclesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    moodCircle: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderWidth: 2,
        borderColor: "rgba(255,255,255,0.3)",
    },
    journalPlaceholder: {
        height: 100,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.1)",
        justifyContent: "center",
        padding: 16,
        marginTop: 8,
    },
    placeholderText: {
        opacity: 0.5,
    },
    quoteCard: {
        backgroundColor: "rgba(94, 139, 170, 0.3)",
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
    },
    quoteText: {
        fontSize: 15,
        fontStyle: "italic",
        lineHeight: 22,
    },
    quoteAuthor: {
        marginTop: 8,
        textAlign: "right",
        fontWeight: "600",

    },
    carouselContent: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 8,
    },
    featureCard: {
        width: 280,
        borderRadius: 20,
        overflow: "hidden",
        marginRight: 16,
    },
    cardImage: {
        width: "100%",
        height: 140,
    },
    cardContent: {
        padding: 16,
        backgroundColor: "rgba(255,255,255,0.1)",
    },
    cardDescription: {
        fontSize: 13,
        opacity: 0.8,
        marginTop: 8,
        marginBottom: 12,
    },
    cardBadge: {
        backgroundColor: "#5E8BAA",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "flex-start",
        flexDirection: "row",
        paddingHorizontal: 14,
        width: '55%',
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        // color: 'black',
        fontSize: 13,
        marginRight: 10,
        fontWeight: "600",
    },
    reactLogo: {
        height: 200,
        width: "100%",
        position: "absolute",
    },
    moodCircleSelected: {
        backgroundColor: "#5E8BAA",
        borderColor: "#fff",
    },
    emoji: {
        fontSize: 24,
    },
    burstEmoji: {
        position: "absolute",
        fontSize: 30,
    },
    burstContainer: {

        position: 'absolute',

        top: 50,

        // left: 0,

        // right: 0,
        left: '40%',
        right: '40%',

        bottom: 0,

        pointerEvents: 'none', // so that touch events pass through

    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        maxHeight: '85%',
        backgroundColor: '#fff',
        borderRadius: 24,
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 20,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoContainer: {
        height: 200,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    videoPlayer: {
        // flex: 1,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',


    },
    videoOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)',
        // alignSelf: 'center',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    modalContent: {
        padding: 24,
    },
    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 24,
        flex: 1,
        marginRight: 16,
        color: '#333',
    },
    durationBadge: {
        flexDirection: 'row',
        backgroundColor: 'rgba(94, 139, 170, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignItems: 'center',
    },
    durationText: {
        color: '#5E8BAA',
        fontWeight: '600',
        marginLeft: 6,
    },
    activityDescription: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
        // marginBottom: 24,
    },
    sectionHeader: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
    },
    stepItem: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    stepNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#5E8BAA',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        flexShrink: 0,
    },
    stepText: {
        color: 'white',
        fontWeight: 'bold',
    },
    stepDescription: {
        flex: 1,
        fontSize: 16,
        lineHeight: 22,
        color: '#444',
    },
    startButton: {
        backgroundColor: '#5E8BAA',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 16,
        // marginTop: 16,
        marginBottom: 10,
    },
    startButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
    },
    cardImageContainer: {
        height: 160,
        position: 'relative',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    input: {
        height: 150,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 12,
        borderRadius: 10,
        textAlignVertical: "top",
        color: 'white'
    },
    saveButton: {
        backgroundColor: "#4CAF50", // calm green
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 10,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
    banner: {
        width: width * 0.5,
        // marginHorizontal: 16,
        marginVertical: 12,
        padding: 16,
        backgroundColor: "#E0F7FA", // soft calming color
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
