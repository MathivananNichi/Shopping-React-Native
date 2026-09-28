import { ScrollView, View, StyleSheet } from "react-native";
import TouchableOpacityView from "../../../components/AppTouchable";
import { ContainerStyle } from "../../../themes/containerStyle";
import AppText from "../../../components/AppText";
import AppColors from "../../../themes/colors";
import { AppTextStyles } from "../../../themes";

interface CategoryScrollCardProps {
  items: CategoryScrollProps[];
  selected: CategoryScrollProps;
  onTap: (item: CategoryScrollProps) => void;
}

export const categories: CategoryScrollProps[] = [
  { title: "All" },
  { title: "Men" },
  { title: "Woman" },
  { title: "Shoes" },
  { title: "Bag" },

  { title: "Beauty" },
  { title: "TSirt" },
];
export type CategoryScrollProps = {
  title: string;
};
export default function CategoryScrollCard(props: CategoryScrollCardProps) {
  const tapped = (selec: CategoryScrollProps) => {
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

          return (
            <View
              style={{ alignItems: "center", paddingVertical: 2 }}
              key={item.title}
            >
              <TouchableOpacityView
                style={[
                  {
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 1,
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                  },
                  { flexWrap: "wrap" },
                  isSelected
                    ? ContainerStyle.categortSelected
                    : ContainerStyle.categortUnSelected,
                ]}
                onPress={() => {
                  tapped(item);
                }}
              >
                <View>
                  <AppText
                    style={[
                      AppTextStyles.categoryStyle,
                      {
                        color: isSelected
                          ? AppColors.white
                          : AppColors.onSurfaceVariant,
                      },
                    ]}
                  >
                    {item.title}
                  </AppText>
                </View>
              </TouchableOpacityView>
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
