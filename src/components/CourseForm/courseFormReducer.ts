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

export const courseFormReducer = (state: any, action: any): any => {
  switch (action.type) {
    case "addField":
      return addField(state, action);
    case "addContent":
      return addContent(state, action);
    case "addDoc":
      return addDoc(state, action);
    case "reset":
      // eslint-disable-next-line no-case-declarations
      const copiedState = { ...state };
      copiedState.length = 0;
      return { ...copiedState };
    default:
      throw Error("Problème d'Ajout");
  }
};

const addField = (state: any, action: any) => {
  const lastElement = Object.keys(state.doc || {}).length;
  const newState = {
    ...state,
    doc: {
      ...state?.doc,
      [lastElement]: {
        ...action?.doc,
      },
    },
  };
  return { ...newState };
};

const addContent = (state: any, action: any) => {
  const newState = {
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
  return { ...newState };
};

const addDoc = (state: any, action: any) => {
  const newState = {
    ...state,
    doc: {
      ...state?.doc,
      [action.index]: {
        ...state?.doc[action?.index],
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
};
