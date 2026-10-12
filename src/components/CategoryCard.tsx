import { ScrollView, View, StyleSheet } from "react-native";
import { ContainerStyle } from "../themes/containerStyle";
import { Ionicons } from "@expo/vector-icons";
import React, { ComponentType } from "react";
import { SvgProps } from "react-native-svg";
import TouchableOpacityView from "./AppTouchable";
import AppColors from "../themes/colors";
import AppText from "./AppText";
import { AppTextStyles } from "../themes";

export type CategoryProps = {
  title: string;
  icon: ComponentType<SvgProps>;
};

interface CategoryCardProps {
  items: CategoryProps[];
  selected: CategoryProps;
  onTap: (item: CategoryProps) => void;
}

export default function CategoryCard(props: CategoryCardProps) {
  const tapped = (selec: CategoryProps) => {
    props.onTap(selec);
  };

  return (
    <View style={[{ flexDirection: "row", gap: 12 }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {props.items.map((item, index) => {
          const isSelected = props.selected == item;

          const Icon = item.icon;
          return (
            <View style={{ alignItems: "center" }} key={item.title}>
              <TouchableOpacityView
                style={[
                  ContainerStyle.categoryContainer,
                  isSelected
                    ? ContainerStyle.categortSelected
                    : ContainerStyle.categortUnSelected,
                ]}
                onPress={() => {
                  tapped(item);
                }}
              >
                <View>
                  <Icon
                    width={20}
                    height={20}
                    color={
                      isSelected ? AppColors.white : AppColors.onSurfaceVariant
                    }
                  />
                </View>
              </TouchableOpacityView>
              <AppText
                style={[
                  AppTextStyles.categoryStyle,
                  {
                    fontWeight: props.selected != item ? "500" : undefined,
                    color:
                      props.selected != item
                        ? AppColors.onSurfaceVariant
                        : undefined,
                  },
                ]}
              >
                {item.title}
              </AppText>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    paddingLeft: 2,
  },
});
