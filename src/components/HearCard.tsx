import { FlatList, StyleSheet, View, ViewProps } from "react-native";
import AppColors from "../themes/colors";
import { appSizes } from "../themes";
import { Heart } from "../assets/svg/hear";

interface HearCardProps extends ViewProps {
    
}


export default function HearCard(props: HearCardProps) {
    

    return (
         <View
              style={[{
                backgroundColor: AppColors.white,
                width: 25,
                height: 25,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: appSizes.borderRadiusRound,
              },props.style]}
            >
              <Heart />
            </View>
    );
}
