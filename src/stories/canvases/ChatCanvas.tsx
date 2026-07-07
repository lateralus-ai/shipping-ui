import {
  Attachment,
  ChatEntry,
  ChatHeader,
  ChatInput,
  ChatStatus,
  ChatTile,
  Copilot,
  Draft,
  Greeting,
  Reference,
  Source,
  Sources,
  Suggestion,
  Suggestions,
} from "../../patterns/Chat";
import {
  FigmaContent,
  FigmaGrid,
  FigmaPage,
  FigmaSection,
  FigmaVariant,
} from "../_layout";
import { FIGMA_WIDTHS } from "./figma-widths";

export const ChatCanvas = () => (
  <FigmaPage title="Chat" width={FIGMA_WIDTHS.chat}>
    <FigmaContent>
      <FigmaSection label="Greeting">
        <FigmaGrid gap={24}>
          <Greeting chief="technical" />
          <Greeting chief="compliance" name="Alex" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Header">
        <div className="max-w-3xl space-y-4">
          <ChatHeader chief="technical" title="Hull inspection discussion" />
          <ChatHeader chief="compliance" title="Port state control" />
        </div>
      </FigmaSection>

      <FigmaSection label="Draft">
        <div className="max-w-xl">
          <Draft />
        </div>
      </FigmaSection>

      <FigmaSection label="Suggestion">
        <FigmaGrid gap={16}>
          <Suggestion label="Review fire safety checklist" />
          <Suggestion label="Summarize inspection findings" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Chat Input">
        <div className="max-w-xl space-y-4">
          <ChatInput />
          <ChatInput placeholder="Ask about compliance..." />
        </div>
      </FigmaSection>

      <FigmaSection label="Chat Status">
        <FigmaGrid gap={16}>
          <ChatStatus status="thinking" />
          <ChatStatus status="typing" message="Chief is typing" />
          <ChatStatus status="idle" message="Ready" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Attachment">
        <FigmaGrid gap={16}>
          <Attachment name="inspection-report.pdf" />
          <Attachment name="crew-list.xlsx" size="840 KB" />
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Reference">
        <Reference title="ISM Code §6.2" page="p. 18" />
      </FigmaSection>

      <FigmaSection label="Sources">
        <div className="max-w-md space-y-4">
          <Source title="Safety Management Manual" />
          <Sources />
        </div>
      </FigmaSection>

      <FigmaSection label="Chat Entry">
        <div className="max-w-xl space-y-4">
          <ChatEntry role="user">Can you review the hull inspection report?</ChatEntry>
          <ChatEntry chief="technical">All systems are within acceptable parameters.</ChatEntry>
          <ChatEntry chief="compliance">I found three compliance gaps that need attention.</ChatEntry>
        </div>
      </FigmaSection>

      <FigmaSection label="Suggestions">
        <div className="max-w-xl">
          <Suggestions />
        </div>
      </FigmaSection>

      <FigmaSection label="Copilot">
        <FigmaGrid gap={24}>
          <FigmaVariant label="Default">
            <div className="h-[480px] w-80 overflow-hidden rounded-control border border-divider-primary">
              <Copilot />
            </div>
          </FigmaVariant>
          <FigmaVariant label="Empty">
            <div className="h-[480px] w-80 overflow-hidden rounded-control border border-divider-primary">
              <Copilot empty />
            </div>
          </FigmaVariant>
          <FigmaVariant label="Thinking">
            <div className="h-[480px] w-80 overflow-hidden rounded-control border border-divider-primary">
              <Copilot thinking />
            </div>
          </FigmaVariant>
        </FigmaGrid>
      </FigmaSection>

      <FigmaSection label="Chat Tile">
        <div className="max-w-sm">
          <ChatTile title="Hull inspection report review" timestamp="2 hours ago" />
        </div>
      </FigmaSection>
    </FigmaContent>
  </FigmaPage>
);
