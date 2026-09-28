import { FlatList, StyleSheet, View } from "react-native";
import AppText from "../../components/AppText";
import AppView from "../../components/AppView";
import HomeHeader from "../../components/headers/HomeHeader";
import { AppPadding } from "../../themes/appPadding";
import { useLocalization } from "../../hooks/translation_hooks";
import { appSizes, AppTextStyles } from "../../themes";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import AppTextInput from "../../components/AppTextInput";
import { Search } from "../../assets/svg/search";
import { Ionicons } from "@expo/vector-icons";
import AppColors from "../../themes/colors";
import { ContainerStyle } from "../../themes/containerStyle";
import CategoryCard from "../../components/CategoryCard";
import { ComponentType, ReactNode, useState } from "react";
import { AllIcon } from "../../assets/svg/all";
import { MenIcon } from "../../assets/svg/men";
import { WomenIcon } from "../../assets/svg/women";
import { ShoeIcon } from "../../assets/svg/shoes";
import { BagIcon } from "../../assets/svg/bags";
import { SvgProps } from "react-native-svg";
import { useScreenSize } from "../../helpers/ScreenDimension";
import { HorizontalSpacer } from "../../components/Spacer";
import TextButton from "../../components/TextButton";
import { Heart } from "../../assets/svg/hear";
import HearCard from "../../components/HearCard";
import CarouselCard from "../../components/CarouselCard";
import { FlashDealsCard, RecomendedForYou } from "./FlashDealsCard";

export type CategoryProps = {
  title: string;
  icon: ComponentType<SvgProps>;
};
const categories: CategoryProps[] = [
  { title: "All", icon: AllIcon },
  { title: "Men", icon: MenIcon },
  { title: "Woman", icon: WomenIcon },
  { title: "Shoes", icon: ShoeIcon },
  { title: "Bag", icon: BagIcon },

  { title: "Beauty", icon: BagIcon },
  { title: "TSirt", icon: BagIcon },
];

export default function HomeScreen() {
  const { screenWidth, screenHeight } = useScreenSize();
  const t = useLocalization();
  const [selectedItem, udateSelected] = useState<CategoryProps>(categories[0]);
  
  const tapped = (sel: CategoryProps) => {
    udateSelected(sel);
  };
  const items = Array.from({ length: 10 }, (_, index) => index + 1);
  return (
    <AppView style={[styles.contianer, { alignItems: "flex-start" }]}>
      <HomeHeader />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "flex-start",
        }}
      >
        <AppText style={AppTextStyles.subTitle}>Hi, Nichi👋</AppText>
        <AppText style={AppTextStyles.heading}>{t.FIND_YOUR_STYLE}</AppText>
        <AppTextInput
          borderStyle={{ elevation: 0, marginVertical: AppPadding.padding16 }}
          prefix={<Search color={AppColors.outline} />}
          suffix={
            <Ionicons
              name="qr-code-outline"
              size={20}
              color={AppColors.outline}
            />
          }
          placeHolder={t.SEARCH_PLACEHOLDER}
        />
        <CategoryCard
          items={categories}
          onTap={tapped}
          selected={selectedItem}
        />
        <CarouselCard />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 20,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <AppText style={{ flex: 1 }}>Flash Deals</AppText>
          <TextButton style={{ flexDirection: "row" }}>
            <AppText
              style={{
                color: AppColors.onSurfaceVariant,
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              {t.VIEW_ALL}
            </AppText>
            <Ionicons
              name="arrow-forward-outline"
              size={20}
              color={AppColors.onSurfaceVariant}
            />
          </TextButton>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.container}
          style={{ flexGrow: 0 }}
        >
          {items.map((model, index) => (
            <FlashDealsCard key={index} />
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <AppText
              style={{
                fontWeight: "600",
                color: AppColors.textPrimary,
                fontSize: 18,
              }}
            >
              Recomended for you
            </AppText>
            <AppText
              style={{
                fontWeight: "400",
                color: AppColors.outline,
                fontSize: 11,
              }}
            >
              Curated styles based on your taste
            </AppText>
          </View>
          <Ionicons
            name="options-outline"
            size={20}
            color={AppColors.onSurfaceVariant}
          />
        </View>

        <View style={{ width: "100%" }}>
          <FlatList
            data={items}
            numColumns={2}
            scrollEnabled={false}
            keyExtractor={(item) => item.toString()}
            columnWrapperStyle={{
              gap: 12,
            }}
            contentContainerStyle={{
              gap: 16,
            }}
            renderItem={({ item }) => (
              <RecomendedForYou
                style={{ flex: 1 }}
                imageStyles={{
                  flex: 1,
                  width: "100%",
                  height: screenHeight * 0.27,
                }}
              />
            )}
          />
        </View>
      </ScrollView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  contianer: {
    padding: AppPadding.padding16,
  },
  container: {
    flexDirection: "row",
    gap: 10,
    paddingLeft: 2,
  },
});
