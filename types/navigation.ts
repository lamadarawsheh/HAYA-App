import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";

export type RootStackParamList = {
  "(tabs)": undefined;
  about: undefined;
  conferences: undefined;
  donate: undefined;
  "(tabs)/blogs": undefined;
  "(tabs)/blog/[id]": { id: string };
};

export type DrawerNavigationProps = DrawerNavigationProp<RootStackParamList> & {
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
};

export type DrawerScreenProps = DrawerNavigationProp<RootStackParamList>;
