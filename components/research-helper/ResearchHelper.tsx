"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Spinner, Card, CardBody } from "@heroui/react";

import { MarkdownRenderer } from "./MarkdownRenderer";

interface Message {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface ResearchHelperProps {
  isExpanded: boolean;
  currentMessage: string;
  onSendMessage: (message: string) => void;
}

const MOCK_SITES = [
  { icon: "logos:wikipedia", name: "Wikipedia" },
  { icon: "logos:stackoverflow-icon", name: "Stack Overflow" },
  { icon: "logos:github-icon", name: "GitHub" },
  { icon: "logos:google-icon", name: "Google Scholar" },
  { icon: "simple-icons:arxiv", name: "arXiv" },
  { icon: "simple-icons:medium", name: "Medium" },
  { icon: "logos:reddit-icon", name: "Reddit" },
  { icon: "simple-icons:nature", name: "Nature" },
];

export const ResearchHelper: React.FC<ResearchHelperProps> = ({
  isExpanded,
  currentMessage,
  onSendMessage,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTopic, setSearchTopic] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [visibleSites, setVisibleSites] = useState<typeof MOCK_SITES>([]);
  const [currentSystemMessageId, setCurrentSystemMessageId] = useState<
    string | null
  >(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const siteIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (currentMessage && !isSearching) {
      if (currentMessage.toLowerCase().includes("summarize")) {
        handleSummarize();
      } else {
        handleSearch(currentMessage);
      }
    }
  }, [currentMessage]);

  const handleSearch = (topic: string) => {
    if (!topic.trim() || isSearching) return;

    setSearchTopic(topic);
    setIsSearching(true);
    setPageCount(0);
    setVisibleSites([]);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: topic,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const systemMessageId = (Date.now() + 1).toString();
    const systemMessage: Message = {
      id: systemMessageId,
      type: "system",
      content: `Researching about "${topic}"`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, systemMessage]);
    setCurrentSystemMessageId(systemMessageId);

    searchIntervalRef.current = setInterval(() => {
      setPageCount((prev) => {
        const newCount = prev + Math.floor(Math.random() * 15) + 5;

        if (newCount >= 100) {
          if (searchIntervalRef.current) {
            clearInterval(searchIntervalRef.current);
          }

          return 100;
        }

        return newCount;
      });
    }, 500);

    let siteIndex = 0;

    siteIntervalRef.current = setInterval(() => {
      if (siteIndex < MOCK_SITES.length) {
        setVisibleSites((prev) => [...prev, MOCK_SITES[siteIndex]]);
        siteIndex++;
      } else {
        if (siteIntervalRef.current) {
          clearInterval(siteIntervalRef.current);
        }
      }
    }, 800);

    setTimeout(() => {
      completeSearch(topic);
    }, 6000);
  };

  const completeSearch = (topic: string) => {
    setIsSearching(false);
    if (searchIntervalRef.current) clearInterval(searchIntervalRef.current);
    if (siteIntervalRef.current) clearInterval(siteIntervalRef.current);

    const assistantMessage: Message = {
      id: Date.now().toString(),
      type: "assistant",
      content: `I've completed an extensive research on "${topic}". Here's what I discovered from analyzing 100+ sources:

**Overview:**
${topic} is a multifaceted subject that has gained significant attention in recent years. My research spans academic papers, industry reports, expert opinions, and real-world case studies from leading institutions.

**Key Findings:**

1. **Current State & Trends**
   • The field has evolved rapidly, with a 45% increase in published research over the past 3 years
   • Major breakthroughs occurred in 2023, particularly in practical applications
   • Industry adoption has accelerated, with Fortune 500 companies investing heavily

2. **Technical Aspects**
   • Core methodologies have been refined through peer-reviewed research
   • New frameworks emerged from MIT and Stanford research labs
   • Performance metrics show 3x improvement compared to traditional approaches

3. **Real-World Applications**
   • Healthcare: Reduced diagnosis time by 60% in pilot programs
   • Finance: Improved risk assessment accuracy by 40%
   • Education: Enhanced learning outcomes for 85% of participants

**Expert Insights:**
Dr. Sarah Chen (MIT): "This represents a paradigm shift in how we approach complex problems."
Prof. Michael Torres (Stanford): "The implications extend far beyond current applications."

**Challenges & Considerations:**
• Scalability remains a concern for enterprise implementations
• Ethical considerations require ongoing dialogue
• Regulatory frameworks are still evolving

**Future Outlook:**
Research indicates continued growth, with projected advancements in efficiency and accessibility. The next 2-3 years will be critical for mainstream adoption.

Would you like me to summarize these findings or explore any specific aspect in more detail?`,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleSummarize = () => {
    if (isSearching) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: "Summarize the findings",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const summaryMessage: Message = {
        id: Date.now().toString(),
        type: "assistant",
        content: `**Executive Summary: ${searchTopic}**

📌 **In Brief:**
${searchTopic} has emerged as a transformative force with 45% research growth and proven real-world impact across healthcare (60% faster diagnosis), finance (40% better risk assessment), and education (85% improved outcomes).

🎯 **Three Key Points:**
1. **Breakthrough Year**: 2023 marked significant advances with MIT/Stanford frameworks showing 3x performance gains
2. **Enterprise Ready**: Fortune 500 adoption accelerating despite scalability challenges
3. **Critical Window**: Next 2-3 years pivotal for mainstream adoption

⚡ **Action Items:**
• Leverage proven frameworks from leading research institutions
• Focus on sector-specific applications with demonstrated ROI
• Address scalability before full implementation

💭 **Bottom Line:**
The research confirms ${searchTopic} as a mature technology with clear benefits, manageable risks, and strong growth trajectory. Early adopters are seeing significant competitive advantages.`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, summaryMessage]);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <div className="mb-4 p-4 rounded-full bg-white/10 backdrop-blur-sm">
            <Icon
              className="text-white w-12 h-12"
              icon="carbon:search-advanced"
            />
          </div>

          <div className="w-full max-w-md">
            <h4 className="font-semibold text-lg text-white leading-tight mb-2">
              Research Helper
            </h4>
            <p className="text-white/60 text-sm leading-relaxed">
              Find and summarize research papers
            </p>
          </div>
        </div>
      ) : (
        <div className="h-full overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
                exit={{ opacity: 0, y: -10 }}
                initial={{ opacity: 0, y: 10 }}
              >
                {message.type === "system" ? (
                  <div className="max-w-[70%]">
                    {message.id === currentSystemMessageId ? (
                      <div className="flex flex-col space-y-3 items-start">
                        <div className="flex items-center gap-2">
                          {isSearching ? (
                            <Spinner color="current" size="sm" />
                          ) : (
                            <Icon
                              className="w-5 h-5 text-green-400"
                              icon="material-symbols:check-circle-rounded"
                            />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              isSearching ? "text-white/80" : "text-green-400"
                            }`}
                          >
                            {isSearching
                              ? message.content
                              : "Research Complete"}
                          </span>
                        </div>

                        {(isSearching || pageCount > 0) && (
                          <>
                            <div className="text-white/60 text-xs">
                              {isSearching ? "Searching" : "Searched"} the web •{" "}
                              {pageCount} pages analyzed
                            </div>

                            {visibleSites.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {visibleSites.map((site, index) => (
                                  <motion.div
                                    key={index}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                  >
                                    <Icon
                                      className="w-4 h-4"
                                      icon={site.icon}
                                    />
                                    <span className="text-[10px] text-white/70">
                                      {site.name}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="text-white/60 text-sm text-center">
                        {message.content}
                      </div>
                    )}
                  </div>
                ) : (
                  <Card>
                    <CardBody>
                      <MarkdownRenderer
                        className="text-sm"
                        content={message.content}
                      />
                    </CardBody>
                  </Card>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ResearchHelper;
