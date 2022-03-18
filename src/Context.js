import { createContext } from "react";


export const ImgFiles = {};

export const Context = createContext({

    Img: ImgFiles,
    setImg: (newStatus) => {
        this.Img = newStatus;
    },

});