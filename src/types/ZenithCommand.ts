
export enum ZenithCommandType {
  ControlDocs = "Control Docs",
  Directives = "Directives",
}

export type ZenithCommand = {
  type: ZenithCommandType;
  name: string;
}

export const controlDocs: ZenithCommand[] = [
  { type: ZenithCommandType.ControlDocs, name: "Initial Prompt" },
  { type: ZenithCommandType.ControlDocs, name: "Program Architecture" },
  { type: ZenithCommandType.ControlDocs, name: "Benchmark Outputs" },
  { type: ZenithCommandType.ControlDocs, name: "Finalized Data Doc" }
];

const buildDirectives = (): ZenithCommand[] => {
  return [1, 2, 3, 4, 5, 6].map((number) => {
    return { type: ZenithCommandType.Directives, name: `Directive ${number}` };
  });
};

export const directives: ZenithCommand[] = buildDirectives();