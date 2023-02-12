package com.sccs.api.socket.controller;


import com.sccs.api.member.dto.MemberDto;
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
  public void socketConnect(SocketDto socketDto, SimpMessageHeaderAccessor headerAccessor){

    if(socketDto.getStatus().equals("enter")){
      socketDto.setMessage(socketDto.getNickname() + "님이 채팅방에 참여하였습니다.");
      studyroomService.increaseStudyroomPersonnel(socketDto.getStudyroomId());
      int temp = studyroomService.getStudyroomPersonnel(socketDto.getStudyroomId());
      socketDto.setPersonnel(temp);
      template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    }

    else if(socketDto.getStatus().equals("ready")){
      socketDto.setMessage(socketDto.getNickname() + "님이 코딩테스트 할 준비가 되었습니다.");
      template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    }
    else if(socketDto.getStatus().equals("start")){

      template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    }

    else if(socketDto.getStatus().equals("study")){
      template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    }

    else if(socketDto.getStatus().equals("present")){
      template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    }

    else if(socketDto.getStatus().equals("chat")){
      socketDto.setMessage(socketDto.getMessage());
      template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    }

    else if(socketDto.getStatus().equals("problem")){
      socketDto.setMessage(socketDto.getMessage());
      template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    }

    else if(socketDto.getStatus().equals("exit")){
      MemberDto memberDto = studyroomService.getHostnicknameByStudyroomInfo(socketDto.getStudyroomId());
      //방장이 방을 나가면
      if(socketDto.getNickname().equals(memberDto.getNickname())){
        socketDto.setMessage("방장이 채팅방을 나갔습니다.");
        studyroomService.endStudyroomByOwner(socketDto.getStudyroomId());
      }
      else {
        socketDto.setMessage(socketDto.getNickname() + "님이 채팅방을 나갔습니다.");
        studyroomService.decreaseStudyroomPersonnel(socketDto.getStudyroomId());
        int temp = studyroomService.getStudyroomPersonnel(socketDto.getStudyroomId());
        socketDto.setPersonnel(temp);
      }
      template.convertAndSend("/sub/studyroom/" + socketDto.getStudyroomId(), socketDto);
    }


  }



}



