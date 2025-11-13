import { Cask } from "@/cask/Cask";
import Card from "../components/Card";

export default function Home() {
  return (
    <div>
      <h1>&lt;Cask/&gt; - The Crate Base Component</h1>

      <Cask p="xl">Test Cask</Cask>

      <div>
        <Card p="lg">
          <h2>Regular Content</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </Card>

        <Card>
          <h2>Always Dark</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </Card>

        <Card>
          <h2>Always Light</h2>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam. Eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
        </Card>

        <Card>
          <h2>Nested Areas</h2>
          <div>
            <div>
              <h3>Regular Child Content</h3>
            </div>
            <div>
              <h3>Always Dark Child</h3>
            </div>
            <div>
              <h3>Always Light Child</h3>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
