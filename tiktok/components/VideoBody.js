import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { memo } from 'react'

const VideoBody = ({data = {}}) => {
  return (
    <>
     

            <View style={styles.bottomSection}>
                <View style={styles.bottomLeftSection}>
                    <Text style={styles.channelName}>{data?.profile?.name || ''}</Text>
                    <Text style={styles.caption}>{data?.metadata?.name || ''}</Text>
                </View>
                <View style={styles.bottomRightSection}>
                    <Image
                        source={require('../assets/floating-music-note.png')}
                        style={[styles.floatingMusicNote]}
                    />
                    <Image
                        source={require("../assets/disc.png")}
                        style={[styles.musicDisc]}
                    />
                </View>
            </View>

            <View style={styles.verticalBar}>
                <TouchableOpacity style={[styles.verticalBarItem, styles.avatarContainer]}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: data?.thumbnailUrl || 'https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw' }}
                    />
                    <View style={styles.followButton}>
                        <Image
                            source={require("../assets/plus-button.png")}
                            style={styles.followIcon}
                        />
                    </View>
                </TouchableOpacity>
                <View style={styles.verticalBarItem}>
                    <Image
                        style={styles.verticalBarIcon}
                        source={require("../assets/heart.png")}
                    />
                </View>
                <View style={styles.verticalBarItem}>
                    <Image
                        style={styles.verticalBarIcon}
                        source={require("../assets/message-circle.png")}
                    />
                </View>
                <View style={styles.verticalBarItem}>
                    <Image
                        style={styles.verticalBarIcon}
                        source={require("../assets/reply.png")}
                    />
                </View>
            </View>
    </>
  )
}

export default memo(VideoBody)

const styles = StyleSheet.create({
    backgroundVideo: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // bottom: 0,
        // right: 0,
        height: '100%',
        width: '100%'
    },
    video: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    bottomSection: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        width: "100%",
        paddingHorizontal: 8,
        paddingBottom: 16,
    },
    bottomLeftSection: {
        flex: 4,
    },
    bottomRightSection: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    channelName: {
        color: "white",
        fontWeight: "bold",
    },
    caption: {
        color: "white",
        marginVertical: 8,
    },
    musicNameContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    musicNameIcon: {
        width: 12,
        height: 12,
        marginRight: 8,
    },
    musicName: {
        color: "white",
    },
    musicDisc: {
        width: 40,
        height: 40,
    },
    verticalBar: {
        position: "absolute",
        right: 8,
        bottom: 72,
    },
    verticalBarItem: {
        marginBottom: 24,
        alignItems: "center",
    },
    verticalBarIcon: {
        width: 32,
        height: 32,
    },
    verticalBarText: {
        color: "white",
        marginTop: 4,
    },
    avatarContainer: {
        marginBottom: 48,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    followButton: {
        position: "absolute",
        bottom: -8,
    },
    followIcon: {
        width: 21,
        height: 21,
    },
    floatingMusicNote: {
        position: "absolute",
        right: 40,
        bottom: 16,
        width: 16,
        height: 16,
        tintColor: "white",
    },
});
