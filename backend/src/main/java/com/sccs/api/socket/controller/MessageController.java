package com.sccs.api.socket.controller;


import com.sccs.api.socket.dto.SocketDto;
import com.sccs.api.studyroom.dto.StudyroomDto;
import com.sccs.api.studyroom.service.StudyroomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Log4j2
public class MessageController {

  private final SimpMessagingTemplate template;
  private final StudyroomService studyroomService;

  @MessageMapping(value = "/studyroom")
  public void socketConnect(SocketDto socketDto, SimpMessageHeaderAccessor headerAccessor) {
    System.out.println(headerAccessor.getSessionId());

    if (socketDto.getStatus().equals("enter")) {
      socketDto.setMessage(socketDto.getNickname() + "님이 채팅방에 참여하였습니다.");
      StudyroomDto studyroomDto = new StudyroomDto();
      studyroomDto.setId(socketDto.getStudyroomId());
      int temp = studyroomService.increaseStudyroomPersonnel(studyroomDto);
      int temp2 = studyroomService.getStudyroomPersonnel(socketDto.getStudyroomId());
      socketDto.setPersonnel(temp2);
      template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    } else if (socketDto.getStatus().equals("ready")) {
      socketDto.setMessage(socketDto.getNickname() + "님이 코딩테스트 할 준비가 되었습니다.");
      template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    } else if (socketDto.getStatus().equals("exit")) {
      socketDto.setMessage(socketDto.getNickname() + "님이 채팅방을 나갔습니다");
      StudyroomDto studyroomDto = new StudyroomDto();
      studyroomDto.setId(socketDto.getStudyroomId());
      int temp = studyroomService.decreaseStudyroomPersonnel(studyroomDto);
      int temp2 = studyroomService.getStudyroomPersonnel(socketDto.getStudyroomId());
      socketDto.setPersonnel(temp2);
      template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    } else if (socketDto.getStatus().equals("chat")) {
      socketDto.setMessage(socketDto.getMessage());
      template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    }
  }

}



