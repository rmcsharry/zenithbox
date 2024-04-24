
export enum ZenithCommandType {
  ControlDocs = "Control Docs",
  Directives = "Directives",
}

export type ZenithCommand = {
  type: ZenithCommandType;
  name: string;
  isRequired: boolean;
}

const controlDocs: ZenithCommand[] = [
  { type: ZenithCommandType.ControlDocs, name: "Initial Prompt", isRequired: true },
  { type: ZenithCommandType.ControlDocs, name: "Program Architecture", isRequired: true },
  { type: ZenithCommandType.ControlDocs, name: "Benchmark Outputs", isRequired: false},
  { type: ZenithCommandType.ControlDocs, name: "Finalized Data Doc", isRequired: false}
];

export const getControlDocs = (): ZenithCommand[] => {

  controlDocs.forEach(command => {
    const isRequired = localStorage.getItem(`${command.name}_isRequired`);
    console.log(isRequired, "isRequired");
    if (isRequired) {
      command.isRequired = isRequired === 'true';
    };
  });

  return controlDocs;
 }


const buildDirectives = (): ZenithCommand[] => {
  return [1, 2, 3, 4, 5, 6].map((number) => {
    return { type: ZenithCommandType.Directives, name: `Directive ${number}`, isRequired: false };
  });
};

export const directives: ZenithCommand[] = buildDirectives();