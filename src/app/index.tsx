import { CategoryButton } from "@/components/CategoryButton"
import { Header } from "@/components/Header"
import { View, Text } from "react-native"

export default function Home() {
  return (
    <View className="flex-1 pt-8">
     <Header title="Faça seu pedido" cartQuantityItems={5}/>


    </View>
  )
}