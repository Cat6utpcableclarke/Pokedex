import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
  ViroARTrackingTargets,
  ViroARImageMarker,
  Viro3DObject,
} from "@reactvision/react-viro";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function PokemonARScene() {
  const [text, setText] = useState("Initializing AR...");

  useEffect(() => {
    // create targets once before scene uses them
    ViroARTrackingTargets.createTargets({
      pokemon_target: {
        source: {
          uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`,
        },
        orientation: "Up",
        physicalWidth: 0.1, // real world width in meters
      },
    });
  }, []);

  function onInitialized(state: any) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Tracking OK");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      setText("Tracking unavailable");
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroARImageMarker target={"pokemon_target"}>
        <Viro3DObject
          type={"GLB"}
          source={{
            uri: "https://raw.githubusercontent.com/Sudhanshu-Ambastha/Pokemon-3D-api/main/models/opt/regular/1.glb",
          }}
          position={[0, 0, -1]}
          scale={[0.9, 0.9, 0.9]}
        />
      </ViroARImageMarker>
      {/* optional debug text */}
    </ViroARScene>
  );
}

const styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlign: "center",
  },
});