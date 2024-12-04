import Typewriter from "typewriter-effect";

function index(props: { text: string[] }) {
  return (
    <>
      <Typewriter
        options={{
          strings: [...props.text],
          autoStart: true,
          loop: true,
        }}
      />
    </>
  );
}

export default index;
