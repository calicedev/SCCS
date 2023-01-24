package com.scss.api.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudyroomLanguageDto {
    int id;
    int studyroomId;
    int languageId;
}
