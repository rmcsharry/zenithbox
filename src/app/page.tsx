import { Textarea } from '@/components/ui/textarea';

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-3 h-[calc(100vh-64px)] w-full">
        <div></div>
        <div>
        <br></br>
          <h4>Please enter the intial prompt below and hit save.</h4>
          <h6>You can return to the home page to edit this at any time, and new chats will then use it.</h6>
          <br></br>
          <Textarea placeholder='Type your initial prompt here...' className={'min-h-[500px]'} />
        </div>
        <div></div>
      </div>
      
    </main>
  );
}
