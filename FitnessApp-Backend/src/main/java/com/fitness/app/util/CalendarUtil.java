package com.fitness.app.util;

import com.fitness.app.exception.AppsException;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class CalendarUtil {

    public static final String DEFAULT_DATE_FORMAT = "dd/MM/yyyy";

    public static String getDefaultFormattedDateOnly(Date date) {
        return getFormattedDate(date, DEFAULT_DATE_FORMAT);
    }

    public static String getDefaultFormattedDateMaskNull(Date date) {
        if (date != null) {
            return CalendarUtil.getDefaultFormattedDateOnly(date);
        }
        return null;
    }

    public static String getFormattedDate(Date date, String dateFormat) {
        SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
        return formatter.format(date);
    }

    public static Date getDefaultParsedDateOnly(String date) throws AppsException {
        return getParsedDate(date, DEFAULT_DATE_FORMAT);
    }

    public static Date getParsedDate(String date, String dateFormat) throws AppsException {

        Date parsedDate;
        try {
            SimpleDateFormat format = new SimpleDateFormat(dateFormat);
            parsedDate = format.parse(date);
            return parsedDate;
        } catch (ParseException e) {
            throw new AppsException("Invalid data format");
        }

    }
}
