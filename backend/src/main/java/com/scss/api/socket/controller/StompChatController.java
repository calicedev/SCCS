package com.scss.api.socket.controller;

import com.scss.api.socket.dto.ChatMessageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
public class StompChatController {
    @Autowired
    private SimpMessagingTemplate webSocket;

    @MessageMapping("/sendTo")
    @SendTo("/topics/sendTo")
    public String SendToMessage() throws Exception {

        return "SendTo";
    }

    @MessageMapping("/Template")
    public void SendTemplateMessage() {
        webSocket.convertAndSend("/topics/template" , "Template");
    }

    @RequestMapping(value="/api")
    public void SendAPI() {
        webSocket.convertAndSend("/topics/api" , "API");
    }
}
