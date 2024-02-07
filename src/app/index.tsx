import { CategoryButton } from "@/components/CategoryButton"
import { Header } from "@/components/Header"
import { View, FlatList, SectionList, Text } from "react-native"
import { CATEGORIES, MENU } from "@/utils/data/products"
import { useRef, useState } from "react"
import { Product } from "@/components/Product"
import { Link } from "expo-router"

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])
  const sectionListRef = useRef<SectionList>(null)

  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory)

    const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)

    if(sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }

  return (
    <View className="flex-1 pt-8">
     <Header title="Faça seu pedido" cartQuantityItems={5}/>
     <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton title={item} onPress={() => handleCategorySelected(item)} isSelected={item === category}/>
        )}

        horizontal
        className="max-h-10 mt-5"
        contentContainerStyle={{ gap: 12 , paddingHorizontal: 20}}
        showsHorizontalScrollIndicator={false}
     />

     <SectionList
      ref={sectionListRef}
      sections={MENU}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled={false} 
      renderItem={({ item }) => (
        <Link href={`/Product/${item.id}`} asChild>
          <Product data={item} />
        </Link>
      )
    }

      renderSectionHeader={({ section: {title} }) => 
        <Text className="text-xl text-white font-heading mt-8 mb-3">
          {title}
        </Text> 
    }

      className="flex-1 p-5"
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{ paddingBottom: 100}}
     />
    </View>
  )
}