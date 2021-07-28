export const initialState = {
  title: "",
  video: "",
  categories: "",
  description: "",
  doc: {
    0: {
      title: "",
      url: "",
      img: "",
    },
  },
};

type ACTIONTYPE =
  | {
      type: "addField";
      doc: {
        title: string;
        url: string;
        img: string;
      };
    }
  | {
      type: "addContent";
      index: number;
      title: string;
      video: string;
      categories: string;
      description: string;
    }
  | {
      type: "addDoc";
      index: number;
      url: string;
      title: string;
      img: string;
    }
  | {
      type: "reset";
    };

export const courseFormReducer = (
  state: typeof initialState,
  action: ACTIONTYPE
): typeof initialState => {
  switch (action.type) {
    case "addField": {
      const lastElement = Object.keys(state.doc || {}).length;
      const newStateField = {
        ...state,
        doc: {
          ...state?.doc,
          [lastElement]: {
            ...action?.doc,
          },
        },
      };
      return { ...newStateField };
    }
    case "addContent": {
      const newStateContent = {
        ...state,
        ...(Object.keys(action).includes("title") && { title: action?.title }),
        ...(Object.keys(action).includes("video") && { video: action?.video }),
        ...(Object.keys(action).includes("categories") && {
          categories: action?.categories,
        }),
        ...(Object.keys(action).includes("description") && {
          description: action?.description,
        }),
      };
      return { ...newStateContent };
    }
    case "addDoc": {
      const newState = {
        ...state,
        doc: {
          ...state?.doc,
          [action.index]: {
            ...state?.doc[action.index],
            ...(Object.keys(action).includes("title") && {
              title: action?.title,
            }),
            ...(Object.keys(action).includes("url") && {
              url: action?.url,
            }),
            ...(Object.keys(action).includes("img") && {
              img: action?.img,
            }),
          },
        },
      };
      return { ...newState };
    }
    case "reset": {
      const copiedState = { ...state };
      Object.values(copiedState).length = 0;
      return { ...copiedState };
    }
    default:
      throw Error("Problème d'Ajout");
  }
};
