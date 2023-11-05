declare namespace NodeJS {
  interface ProcessEnv {
    /** node environment */
    BASE_URL: string;
    NEXT_PUBLIC_BASE_URL: string;
  }
}

export namespace Editor {
  export interface CommonEditorProperties {
    id: number;
  }

  export interface ImageBlock extends CommonEditorProperties {
    type: "image";
    src: string;
  }

  export interface TextBlock extends CommonEditorProperties {
    type: "text";
  }

  export type Block = ImageBlock | TextBlock;
}
