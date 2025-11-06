import Container from "../../components/shared/Container";
import { GenericHtml } from "../../components/shared/GenericHtml";
import Heading from "../../components/shared/Heading";
import Page from "../../components/template/Page";

export default function NotFound() {
  return (
    <Page>
      <Container>
        <GenericHtml>
          <Heading>404 - Page Not Found 🚀</Heading>
          <p>
            Oops! It looks like the page you’re trying to access doesn’t exist.
            Maybe it went on vacation, decided to explore the universe, or got
            lost somewhere between two black holes. 🌌
          </p>
          <p>
            But don’t worry — you’re not lost in space (yet). You can safely return to the{' '}
            <a href='/'>home page</a> or{' '}
            <a href='/history'>your history</a> — or you can stay here and pretend you’ve
            discovered a secret page that only the coolest explorers can access. 🧭✨
          </p>
          <p>
            If you think this page should exist (or if you’d like to chat about time travel
            and wormholes), feel free to get in touch. Otherwise, use the menu to return
            to the real world.
          </p>
          <p>
            Meanwhile, here’s something to ponder: “If a page doesn’t exist on the internet,
            did it ever truly exist?” 🤔💭
          </p>
        </GenericHtml>
      </Container>
    </Page>
  );
}