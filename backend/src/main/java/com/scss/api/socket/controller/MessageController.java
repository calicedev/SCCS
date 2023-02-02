package com.scss.api.socket.controller;


import com.scss.api.socket.dto.SocketDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Log4j2
public class MessageController {

    private final SimpMessagingTemplate template;


    @MessageMapping(value = "/study/enter")
    public void enter(SocketDto socketDto){

        System.out.println(socketDto.getNickname());
        socketDto.setMessage(socketDto.getNickname() + "님이 채팅방에 참여하였습니다.");
        template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    }

    @MessageMapping(value = "/study/ready")
    public void message(SocketDto socketDto){
        template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    }
}



