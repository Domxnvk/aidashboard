"use client";

import React from "react";
import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { ScrollShadow } from "@heroui/scroll-shadow";

import { PromptCard, PromptItem } from "./PromptCards";
import { WidgetCard, WidgetItem } from "./WidgetCards";

const MAX_PROMPT_SELECTIONS = 4;
const MAX_WIDGET_SELECTIONS = 5;

interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  items: PromptItem[] | WidgetItem[];
  selectedIds: number[];
  onSelect: (id: number) => void;
  totalSelections: number;
  type: "prompts" | "widgets";
  playgroundItemCount?: number;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({
  isOpen,
  onClose,
  title,
  items,
  selectedIds,
  onSelect,
  type,
  playgroundItemCount = 0,
}) => {
  const selectionLimit =
    type === "prompts" ? MAX_PROMPT_SELECTIONS : MAX_WIDGET_SELECTIONS;
  const currentCount = selectedIds.length;

  return (
    <Modal
      hideCloseButton
      backdrop="blur"
      classNames={{
        backdrop: "bg-black/60",
        base: "rounded-t-3xl rounded-b-none md:rounded-xl bg-white/10 backdrop-blur-md border border-white/20 mb-0 md:my-auto mx-auto max-w-4xl",
        wrapper: "items-end md:items-center justify-center overflow-y-auto",
        body: "p-0",
      }}
      isOpen={isOpen}
      placement="bottom-center"
      scrollBehavior="inside"
      size="3xl"
      onClose={onClose}
    >
      <ModalContent>
        {(closeHandler) => (
          <>
            <ModalBody className="p-0 relative">
              <div className="relative">
                <Button
                  isIconOnly
                  className="absolute top-4 right-4 z-10"
                  color="default"
                  radius="full"
                  size="sm"
                  variant="light"
                  onPress={closeHandler}
                >
                  <Icon icon="mdi:close" width="20" />
                </Button>

                <div className="w-12 h-1.5 bg-gray-700 rounded-full mx-auto mt-4 md:hidden" />

                <div className="p-6 pb-10">
                  <div className="mb-6 flex items-center">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    <div className="ml-3 inline-flex items-center justify-center px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                      <span className="text-white text-sm whitespace-nowrap">
                        {currentCount}/{selectionLimit} selected
                      </span>
                    </div>
                  </div>

                  <ScrollShadow
                    hideScrollBar
                    className="max-h-[50vh] md:max-h-[60vh]"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 auto-rows-fr px-1 py-1">
                      {items.map((item, index) => {
                        if (type === "widgets") {
                          const widget = item as WidgetItem;
                          const isAlreadySelected = selectedIds.includes(
                            widget.id,
                          );
                          const playgroundIsFull = playgroundItemCount >= 4;
                          const selectionLimitReached =
                            currentCount >= MAX_WIDGET_SELECTIONS;

                          const isDisabled =
                            (!isAlreadySelected && selectionLimitReached) ||
                            (!isAlreadySelected &&
                              currentCount === 4 &&
                              playgroundIsFull);

                          return (
                            <div
                              key={widget.id}
                              aria-disabled={isDisabled}
                              aria-pressed={selectedIds.includes(widget.id)}
                              className={`h-full ${
                                isDisabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              role="button"
                              tabIndex={isDisabled ? -1 : 0}
                              onClick={(e) => {
                                if (isDisabled) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }
                              }}
                              onKeyDown={(e) => {
                                if (
                                  !isDisabled &&
                                  (e.key === "Enter" || e.key === " ")
                                ) {
                                  e.preventDefault();
                                  onSelect(widget.id);
                                }
                              }}
                            >
                              <WidgetCard
                                index={index}
                                isSelected={selectedIds.includes(widget.id)}
                                widget={widget}
                                onSelect={() => {
                                  if (!isDisabled) {
                                    onSelect(widget.id);
                                  }
                                }}
                              />
                            </div>
                          );
                        } else {
                          const prompt = item as PromptItem;
                          const isDisabled =
                            currentCount >= MAX_PROMPT_SELECTIONS &&
                            !selectedIds.includes(prompt.id);

                          return (
                            <div
                              key={prompt.id}
                              aria-disabled={isDisabled}
                              aria-pressed={selectedIds.includes(prompt.id)}
                              className={
                                isDisabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }
                              role="button"
                              tabIndex={isDisabled ? -1 : 0}
                              onClick={(e) => {
                                if (isDisabled) {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }
                              }}
                              onKeyDown={(e) => {
                                if (
                                  !isDisabled &&
                                  (e.key === "Enter" || e.key === " ")
                                ) {
                                  e.preventDefault();
                                  onSelect(prompt.id);
                                }
                              }}
                            >
                              <PromptCard
                                index={index}
                                isSelected={selectedIds.includes(prompt.id)}
                                prompt={prompt}
                                onSelect={() => {
                                  if (!isDisabled) {
                                    onSelect(prompt.id);
                                  }
                                }}
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </ScrollShadow>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ExploreModal;
