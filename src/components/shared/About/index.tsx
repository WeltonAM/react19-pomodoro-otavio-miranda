import Page from "../../template/Page";
import Container from "../Container";
import { GenericHtml } from "../GenericHtml";
import Heading from "../Heading";

export function AboutPomodoro() {
    return (
        <Page>
            <Container>
                <GenericHtml>
                    <Heading>The Pomodoro Technique 🍅</Heading>

                    <p>
                        The Pomodoro Technique is a productivity method created by{' '}
                        <strong>Francesco Cirillo</strong>. It consists of dividing work into
                        time blocks (the famous "Pomodoros") interspersed with breaks. The goal
                        is to maintain total focus for a short period while ensuring rest to
                        avoid mental fatigue.
                    </p>

                    <img src='https://placehold.co/1920x1080' alt='' />

                    <h2>How does the traditional Pomodoro work?</h2>
                    <ul>
                        <li>
                            <strong>1. Choose a task</strong> you want to work on.
                        </li>
                        <li>
                            <strong>2. Work on it for 25 minutes</strong> without interruptions.
                        </li>
                        <li>
                            <strong>3. Take a short 5-minute break</strong>.
                        </li>
                        <li>
                            <strong>4. After 4 cycles, take a long break</strong>{' '}
                            (usually 15–30 minutes).
                        </li>
                    </ul>

                    <h2>
                        But <strong>Chronos Pomodoro</strong> has a special twist 🚀
                    </h2>

                    <p>
                        Our app follows the original concept but adds some improvements and
                        customizations to make the process even more efficient:
                    </p>

                    <h3>⚙️ Customizable timing</h3>
                    <p>
                        You can configure the focus, short break, and long break durations however
                        you like! Just go to the{' '}
                        <a href='/settings'>settings page</a> and adjust the minutes as you prefer.
                    </p>

                    <h3>🔁 Organized cycle sequence</h3>
                    <p>
                        Each time you complete a cycle, a new task is automatically added to your
                        history, and the app suggests the next cycle (focus or break).
                    </p>
                    <p>
                        <strong>Our default setup:</strong>
                    </p>
                    <ul>
                        <li>
                            <strong>Odd cycles</strong>: Work (focus).
                        </li>
                        <li>
                            <strong>Even cycles</strong>: Short break.
                        </li>
                        <li>
                            <strong>Cycle 8</strong>: Special long break to reset the full cycle.
                        </li>
                    </ul>

                    <h3>🍅 Cycle visualization</h3>
                    <p>
                        Below the timer, you’ll see colored dots representing the cycles:
                    </p>
                    <ul>
                        <li>🟡 Yellow: Work cycle (focus).</li>
                        <li>🟢 Green: Short break.</li>
                        <li>🔵 Blue: Long break (appears every 8 cycles).</li>
                    </ul>

                    <p>
                        This way, you always know where you are in the process and what’s next.
                        No more jotting down notes or doing mental math!
                    </p>

                    <h3>📊 Automatic history</h3>
                    <p>
                        All your tasks and completed cycles are saved in your{' '}
                        <a href='/history'>history</a>, showing whether they were completed or
                        interrupted. This lets you track your progress over time.
                    </p>

                    <h2>Why use Chronos Pomodoro?</h2>
                    <ul>
                        <li>✅ Organize your focus clearly.</li>
                        <li>✅ Work and rest in the right measure.</li>
                        <li>✅ Customize your own cycles and times.</li>
                        <li>✅ Track your progress automatically.</li>
                    </ul>

                    <p>
                        <strong>Ready to focus?</strong> Let’s{' '}
                        <a href='/'>go back to the homepage</a> and start your Pomodoros! 🍅🚀
                    </p>

                    <p>
                        <em>"Total focus, no rush, no pause — just go!"</em> 💪🧘‍♂️
                    </p>
                </GenericHtml>
            </Container>
        </Page>
    );
}
