import { FlatList } from "react-native";
import { useScreenSize } from "../helpers/ScreenDimension";
import { HorizontalSpacer } from "./Spacer";
import { ImageContainer } from "./ImageContainer";

interface CarouselCardProps {}

export default function CarouselCard(props: CarouselCardProps) {
  const images = Array.from({ length: 10 }, (_, index) => index + 1);

  const { screenWidth } = useScreenSize();
  return (
    <FlatList
      data={images}
      horizontal
      style={{ gap: 3, flexGrow: 0 }}
      ItemSeparatorComponent={() => <HorizontalSpacer gap={10} />}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <ImageContainer
          imageStyle={{
            width: screenWidth * 0.8,
            height: 200,
            borderRadius: 12,
            marginTop: 12,
          }}
        />
      )}
    />
  );
}
