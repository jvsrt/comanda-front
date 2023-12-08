import {
  StyleSheet,
  Button,
  Text,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import getCardapio from "../../components/getCardapio";
import Loading from "../../components/Loading";

import { api } from "../../services/api";

const ListaCardapio = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      getCardapio(setData, setLoading, setError);
    });
  }, [navigation]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const excluirCardapio = async (id) => {
    try {
      await api.delete(`/cardapio/${id}`, {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Lista de itens do cardapio</Text>

        {loading && <Loading />}
        {!loading && data?.length
          ? data.map((data, i) => (
              <Card
                style={{
                  marginBottom: 5,
                }}
                key={i}
              >
                <Text>{data.id}</Text>
                <Text>{data.nome}</Text>
                <Text>{data.categoria}</Text>
                <Text>{data.valor}</Text>
                <Button
                  title="Update"
                  onPress={() =>
                    navigation.navigate("UpdateCardapio", { id: data.id })
                  }
                />

                <Button
                  title="Excluir"
                  onPress={() => excluirCardapio(data.id)}
                />
              </Card>
            ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};
export default ListaCardapio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000",
    paddingTop: 40,
    paddingBottom: 60,
    alignContent: "center",
    alignSelf: "center",
    width: "70%",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 30,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#38a69d",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
});
