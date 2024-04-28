
export enum ZenithCommandType {
  ControlDocs = "Control Docs",
  Directives = "Directives",
}

export type CommandOption = 'ignore' | 'separate' | 'append';

export type ZenithCommand = {
  type: ZenithCommandType;
  name: string;
  option?: CommandOption;
  isPrimary?: boolean;
}

export const getControlDocs = (): ZenithCommand[] => {

  const controlDocs: ZenithCommand[] = [
    { type: ZenithCommandType.ControlDocs, name: "Initial Prompt", option: 'separate', isPrimary: true},
    { type: ZenithCommandType.ControlDocs, name: "Program Architecture", option: 'ignore', isPrimary: false},
    { type: ZenithCommandType.ControlDocs, name: "Benchmark Outputs", option: 'ignore', isPrimary: false},
    { type: ZenithCommandType.ControlDocs, name: "Finalized Data Structure", option: 'ignore', isPrimary: false},
  ];

  if (typeof window !== undefined) {
    controlDocs.forEach(command => {
      const option = localStorage.getItem(`${command.name}_option`);
      if (option) {
        command.option = option as CommandOption;
      };
    });
  }

  return controlDocs;
 }


const buildDirectives = (): ZenithCommand[] => {
  return [1, 2, 3, 4, 5, 6].map((number) => {
    return { type: ZenithCommandType.Directives, name: `Directive ${number}`};
  });
};

export const directives: ZenithCommand[] = buildDirectives();