import React, { useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import useSClang from "../../../../hooks/useSClang";
import { getRequestMap } from "./_map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import MessageBoard from "../../../../components/MessageBoard";
import Playground from "../../../../components/Playground";

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  padding: 5px 10px;
  background: whitesmoke;
  border-bottom: solid 1px lightgrey;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  cursor: pointer;
  margin-left: 5px;
  color: ${props => props.color};
  &:hover {
    color: black;
  }
  transition: color 50ms ease-in;
`;

export default function OrchestraChatShowView() {
  const { orchestra: orchestraId, chat } = useParams();
  const [targetType, targetId] = chat.split("-");
  const { evaluate } = useSClang();
  const [userId] = useState(localStorage.getItem("userId"));

  // Receive new messages from other members and render it to sound
  const onNewMessage = useCallback(
    message => {
      if (message.context === "SUPERCOLLIDER" && message.format === "SC_LANG") {
        // If message didn't originate from the operating user:
        if (message.from.user._id !== userId) {
          // Render it to sound.
          evaluate(message.body);
        }
      }
    },
    [evaluate, userId]
  );

  const {
    getTitle,
    getMessages,
    getTargetQuery,
    getMessagesQuery,
    moreMessagesQuery,
    sendMessageMutation,
    newMessageSubscription
  } = getRequestMap(orchestraId, targetId, targetType, onNewMessage);

  // Get general data about the target of the chat.
  const { data: targetData } = useQuery(
    getTargetQuery.document,
    getTargetQuery.options
  );

  // Get messages relative to this chat target.
  const {
    subscribeToMore,
    fetchMore,
    loading,
    data: messagesData,
    networkStatus
  } = useQuery(getMessagesQuery.document, {
    ...getMessagesQuery.options,
    notifyOnNetworkStatusChange: true
  });

  const [fetching, setFetching] = useState();
  useEffect(() => {
    setFetching(loading || networkStatus === 4);
  }, [loading, networkStatus]);

  const fetchMoreMessages = useCallback(
    cursor => {
      const query = moreMessagesQuery(cursor);
      fetchMore(query);
    },
    [moreMessagesQuery, fetchMore]
  );

  // Submit a subscription to receive more messages
  // Note: this effect should be called only once,
  // otherwise there will be multiple concurrent
  // subscriptions.
  useEffect(() => {
    subscribeToMore(newMessageSubscription);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get function to send a new message
  const [sendMessage] = useMutation(
    sendMessageMutation.document,
    sendMessageMutation.options
  );

  // This callback gets execute when a user
  // wants to share a simple message through
  // the MessageBoard component's interface.
  const onSend = useCallback(
    text => {
      sendMessage({
        variables: {
          ...sendMessageMutation.variables,
          format: "PLAIN_TEXT",
          context: "CHAT",
          body: text
        }
      });
    },
    [sendMessageMutation.variables, sendMessage]
  );

  // This callback gets execute when a user
  // wants to share a piece of supercollider
  // code through the CodeEditor component's intreface.
  const onEvaluate = useCallback(
    text => {
      sendMessage({
        variables: {
          ...sendMessageMutation.variables,
          format: "SC_LANG",
          context: "SUPERCOLLIDER",
          body: text
        }
      });
    },
    [sendMessageMutation.variables, sendMessage]
  );

  // Parse data to be displayed
  const title = getTitle(targetData);
  const { edges } = getMessages(messagesData) || { edges: [] };
  const messages = edges.map(edge => edge.node);

  // Toggle visibility of message board
  const [chatVisible, setChatVisible] = useState(false);
  const onChatClick = useCallback(() => setChatVisible(!chatVisible), [
    chatVisible
  ]);

  const breakpoints = useBreakpoint();
  const editorVisible = breakpoints.sm || !chatVisible;

  return (
    <StyledWrapper>
      <StyledHeader>
        <h3>{title}</h3>
        <StyledIcon
          icon={faCommentDots}
          onClick={onChatClick}
          color={chatVisible ? "black" : "lightgrey"}
        />
      </StyledHeader>
      <StyledContainer>
        {editorVisible && <Playground onEvaluate={onEvaluate} />}
        {chatVisible && (
          <MessageBoard
            messages={messages}
            onSend={onSend}
            fetchMore={fetchMoreMessages}
            fetching={fetching}
          />
        )}
      </StyledContainer>
    </StyledWrapper>
  );
}
