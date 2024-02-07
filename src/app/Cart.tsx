import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { LinkButton } from "@/components/LinkButton";
import { Product } from "@/components/Product";
import { useCartStore } from "@/stores/CartStore";
import { formatCurrency } from "@/utils/functions/formatCurrency";
import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Cart() {
  const cartStore = useCartStore()
  const total =  formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0))

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho"/>
    <KeyboardAwareScrollView>
      <ScrollView>
        <View className="p-5 flex-1" >
        { cartStore.products.length > 0 ? (
          <View className="border-b border-slate-700">
            {cartStore.products.map((product) => (
                <Product key={product.id} data={product} />
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

          <Input placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."/>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
          <Button>
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