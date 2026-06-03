/**
 * AgentBandhu hero phone-screen mockups — pure CSS/HTML, themed to match the
 * Pomegranate design system. Structural styling + keyframes live in globals.css
 * (`.pom-screen*`). Everything sizes in container-query units (cqw) so each
 * screen scales to its own phone width. Decorative only — `aria-hidden`.
 */

/** Faux status bar shared by the screens. */
function StatusBar() {
  return (
    <div className="pom-screen-bar" aria-hidden>
      <span>9:02</span>
      <span className="pom-screen-bar-dots">
        <i /> <i /> <i />
      </span>
    </div>
  );
}

/** Center / focal phone: the morning queue dashboard. */
export function QueueMockup() {
  return (
    <div className="pom-screen pom-screen--queue" aria-hidden>
      <StatusBar />
      <div className="pom-q-head">
        <span className="pom-q-hi">Subah ki shubhkamna,</span>
        <span className="pom-q-name">Anil ji</span>
      </div>

      <div className="pom-q-action">
        <span className="pom-q-action-txt">Aaj 3 birthdays.</span>
        <span className="pom-q-action-btn">Send greetings</span>
      </div>

      <ul className="pom-q-list">
        <li className="pom-q-row">
          <span className="pom-q-av">A</span>
          <span className="pom-q-meta">
            <b>Aarti</b>
            <span>Birthday today</span>
          </span>
          <span className="pom-q-send">Send</span>
        </li>
        <li className="pom-q-row">
          <span className="pom-q-av pom-q-av--2">R</span>
          <span className="pom-q-meta">
            <b>Rakesh</b>
            <span>Renewal in 3 days</span>
          </span>
          <span className="pom-q-send">Send</span>
        </li>
        <li className="pom-q-row">
          <span className="pom-q-av pom-q-av--3">P</span>
          <span className="pom-q-meta">
            <b>Pradnya</b>
            <span>Anniversary tomorrow</span>
          </span>
          <span className="pom-q-send">Send</span>
        </li>
      </ul>
    </div>
  );
}

/** Left phone: a WhatsApp-style birthday greeting thread. */
export function ChatMockup() {
  return (
    <div className="pom-screen pom-screen--chat" aria-hidden>
      <div className="pom-chat-head">
        <span className="pom-chat-av">A</span>
        <span className="pom-chat-who">
          <b>Aarti</b>
          <span>online</span>
        </span>
      </div>

      <div className="pom-chat-body">
        <span className="pom-chat-day">Today</span>
        <div className="pom-bubble pom-bubble--out">
          Happy birthday, Aarti ji! 🎉 Wishing you health and prosperity.
          <span className="pom-bubble-meta">9:02 ✓✓</span>
        </div>
        <div className="pom-bubble pom-bubble--in pom-typing">
          <i /> <i /> <i />
        </div>
        <div className="pom-bubble pom-bubble--in pom-bubble--reply">
          Thank you Anil ji 🙏
          <span className="pom-bubble-meta">9:14</span>
        </div>
      </div>
    </div>
  );
}

/** Right phone: the renewal cascade card with a status that flips to Paid. */
export function RenewalMockup() {
  return (
    <div className="pom-screen pom-screen--renewal" aria-hidden>
      <StatusBar />
      <div className="pom-rn-card">
        <div className="pom-rn-top">
          <span className="pom-rn-av">A</span>
          <span className="pom-rn-who">
            <b>Anil Kumar</b>
            <span>Policy ••• 4821</span>
          </span>
        </div>

        <div className="pom-rn-prem">
          <span>Premium due</span>
          <b>₹18,400</b>
        </div>

        <div className="pom-rn-pill">
          <span className="pom-rn-due">Due in 3 days</span>
          <span className="pom-rn-paid">Paid ✓</span>
        </div>

        <div className="pom-rn-cascade-label">Renewal cascade</div>
        <div className="pom-cascade">
          <span>30</span>
          <span>15</span>
          <span>7</span>
          <span>3</span>
          <span>1</span>
        </div>
      </div>
    </div>
  );
}
