export const initialState = {
  title: "",
  video: "",
  categories: "",
  description: "",
  doc: {
    0: {
      linkTitle: "",
      linkUrl: "",
      imgUrl: "",
    },
  },
};

type ACTIONTYPE =
  | {
      type: "addField";
      doc: {
        linkTitle: string;
        linkUrl: string;
        imgUrl: string;
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
      linkUrl: string;
      linkTitle: string;
      imgUrl: string;
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
            ...(Object.keys(action).includes("linkTitle") && {
              linkTitle: action?.linkTitle,
            }),
            ...(Object.keys(action).includes("linkUrl") && {
              linkUrl: action?.linkUrl,
            }),
            ...(Object.keys(action).includes("imgUrl") && {
              imgUrl: action?.imgUrl,
            }),
          },
        },
      };
      return { ...newState };
    }
    case "reset":
      // eslint-disable-next-line no-case-declarations
      const copiedState = { ...state };
      Object.values(copiedState).length = 0;
      return { ...copiedState };
    default:
      throw Error("Problème d'Ajout");
  }
};
