import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserState } from "./store/userContext";
import "./assets/f.scss";

const token: UserState | null = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") as string)
  : null;
const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),

  headers: {
    Authorization: token ? `Bearer ${token.accessToken}` : "",
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
