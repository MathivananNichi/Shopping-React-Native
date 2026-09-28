import { Search } from "../../assets/svg/search";
import AppText from "../../components/AppText";
import AppTextInput from "../../components/AppTextInput";
import AppView from "../../components/AppView";
import HomeHeader from "../../components/headers/HomeHeader";
import { AppPadding } from "../../themes/appPadding";
import { ScrollView, StyleSheet, View } from "react-native";
import AppColors from "../../themes/colors";
import { Ionicons } from "@expo/vector-icons";
import { useLocalization } from "../../hooks/translation_hooks";
import CategoryScrollCard, {
  categories,
  CategoryScrollProps,
} from "./components/CategoryScrollCard";
import { useState } from "react";
import { useScreenSize } from "../../helpers/ScreenDimension";
import { appSizes } from "../../themes";
import { ContainerStyle } from "../../themes/containerStyle";
import AppButton from "../../components/AppButton";
import MainAdd from "./components/MainAdd";
import {
  ArrowCard,
  CategorySecondCard,
  CategoryThirdCard,
  ItemsCount,
} from "./components/subComponents";
import {
  clothingUrl,
  ImageBackgroundContainer,
  ImageContainer,
} from "../../components/ImageContainer";

import { LinearGradient } from "expo-linear-gradient";
import TextButton from "../../components/TextButton";
import { VerticalSpacer } from "../../components/Spacer";
export default function CategoryScreen() {
  const [selectedItem, udateSelected] = useState<CategoryScrollProps>(
    categories[0],
  );

  const tapped = (sel: CategoryScrollProps) => {
    udateSelected(sel);
  };
  const t = useLocalization();
  return (
    <AppView style={styles.contianer}>
      <HomeHeader />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "flex-start",
        }}
      >
        <AppTextInput
          borderStyle={{ elevation: 0, marginVertical: AppPadding.padding16 }}
          prefix={<Search color={AppColors.outline} />}
          suffix={<Ionicons name="mic" size={20} color={AppColors.outline} />}
          placeHolder={t.SEARCH_PLACEHOLDER}
        />
        <CategoryScrollCard
          items={categories}
          onTap={tapped}
          selected={selectedItem}
        />
        <MainAdd />

        {/* Top items */}
        <CategorySecondCard />
        <VerticalSpacer gap={12} />
        <CategorySecondCard />
        <VerticalSpacer gap={18} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
          <CategoryThirdCard />
          <CategoryThirdCard />
          <CategoryThirdCard />
          <CategoryThirdCard />
        </View>
      </ScrollView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  contianer: {
    padding: AppPadding.padding16,
  },
});
