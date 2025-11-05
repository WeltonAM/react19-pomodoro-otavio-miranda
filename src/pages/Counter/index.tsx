import CountDown from "../../components/counter/CountDown";
import Form from "../../components/counter/Form";
import Page from "../../components/template/Page";

export default function Counter() {
  return (
    <Page>
      <CountDown />
      <Form />
    </Page>
  );
}