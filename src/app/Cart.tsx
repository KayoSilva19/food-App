import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { LinkButton } from "@/components/LinkButton";
import { Product } from "@/components/Product";
import { ProductsCartProps, useCartStore } from "@/stores/CartStore";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Cart() {
  const [address, setAddress] = useState("")
  const cartStore = useCartStore()
  const navigation = useNavigation()

  const total =  formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0))

  function handleProductRemove(product: ProductsCartProps) {
    Alert.alert("Remover", `Deseja Remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        onPress: () => {
          cartStore.remove(product.id)
        },
      }
    ])
  }

  function handleToOrder() {
    if(address.trim().length === 0) {
      return Alert.alert("Pedido", "Informe os dados da entrega!")
    } 

    const products = cartStore.products.map((product) => 
      `\n ${product.quantity} ${product.title}`
    ).join("")

    const message = `
      🍔 NOVO PEDIDO
      \n Entregar em: ${address}
      ${products}
      \n Valor Total: ${total}
    `

    cartStore.clear()
    navigation.goBack()
    return message

  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho"/>
    <KeyboardAwareScrollView>
      <ScrollView>
        <View className="p-5 flex-1" >
        { cartStore.products.length > 0 ? (
          <View className="border-b border-slate-700">
            {cartStore.products.map((product) => (
                <Product 
                  key={product.id} 
                  data={product} 
                  onPress={() => handleProductRemove(product)} />
            ))}
          </View>
        ) : (
          <Text className="font-body text-slate-400 text-center my-8">
            Seu carrinho está vazio.
          </Text>
        )}

          <View className="flex-row gap-2 items-center mt-5 mb-4">
            <Text className="text-white text-xl font-subtitle">Total:</Text>
            <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
          </View>

          <Input 
            placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
            onChangeText={setAddress}
            blurOnSubmit
            onSubmitEditing={handleToOrder}
            returnKeyType="next"
          />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
          <Button onPress={handleToOrder}>
            <Button.Text>
              Enviar Pedido
            </Button.Text>
            <Button.Icon>
              <Feather name="arrow-right-circle" size={20}/>
            </Button.Icon>
          </Button>

          <LinkButton title="Voltar ao cardápio" href="/"/>
      </View>
    </View>
  )
}