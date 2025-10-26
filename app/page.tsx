"use client"
import UserTable from "@/src/components/userTable";
import { store } from "@/src/store/store";
import { Provider } from "react-redux";

const Home = () => {
  return (
    <Provider store={store}>
      <UserTable />
    </Provider>
  )
}

export default Home;