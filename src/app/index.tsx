import { CategoryButton } from "@/components/CategoryButton"
import { Header } from "@/components/Header"
import { View, FlatList } from "react-native"
import { CATEGORIES } from "@/utils/data/products"
import { useState } from "react"

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])

  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory )
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
        className="max-w-10 mt-5"
        contentContainerStyle={{ gap: 12 , paddingHorizontal: 20}}
        showsHorizontalScrollIndicator={false}
     />

    </View>
  )
}