package com.alcas.backend.service;

import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:no-reply@uum.edu.my}")
    private String senderEmail;

    @Value("${app.frontend.url:http://localhost:4200}")
    private String frontendUrl;

    public EmailService(@Autowired(required = false) JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /**
     * Sends an official UUM ALCAS password reset email containing a direct link and a 6-digit OTP code.
     */
    public void sendPasswordResetEmail(String toEmail, String recipientName, String resetLink, String code) {
        String subject = "Reset Your ALCAS Password - Universiti Utara Malaysia";
        String displayName = (recipientName != null && !recipientName.isBlank()) ? recipientName : "Student";
        String htmlContent = buildPasswordResetHtmlTemplate(displayName, toEmail, resetLink, code);

        log.info("--------------------------------------------------------------------------------");
        log.info("[ALCAS EMAIL DISPATCH] Target: {}", toEmail);
        log.info("[ALCAS EMAIL DISPATCH] OTP Code: {}", code);
        log.info("[ALCAS EMAIL DISPATCH] Reset Link: {}", resetLink);
        log.info("--------------------------------------------------------------------------------");

        sendHtmlEmail(toEmail, subject, htmlContent);
    }

    /**
     * Sends an account activation verification email.
     */
    public void sendAccountActivationEmail(String toEmail, String recipientName, String code) {
        String subject = "Activate Your ALCAS Account - Universiti Utara Malaysia";
        String displayName = (recipientName != null && !recipientName.isBlank()) ? recipientName : "Student";
        String htmlContent = buildAccountActivationHtmlTemplate(displayName, toEmail, code);

        sendHtmlEmail(toEmail, subject, htmlContent);
    }

    /**
     * Sends a general system announcement / broadcast email.
     */
    public void sendBroadcastEmail(String toEmail, String subject, String messageContent) {
        String htmlContent = buildBroadcastHtmlTemplate(subject, messageContent);
        sendHtmlEmail(toEmail, "ALCAS Notice: " + subject, htmlContent);
    }

    private void sendHtmlEmail(String toEmail, String subject, String htmlContent) {
        if (mailSender == null) {
            log.warn("[EMAIL SERVICE] JavaMailSender is not initialized. Email was logged only.");
            return;
        }

        java.util.concurrent.CompletableFuture.runAsync(() -> {
            try {
                MimeMessage message = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                String fromAddress = (senderEmail != null && !senderEmail.isBlank()) ? senderEmail : "no-reply@uum.edu.my";
                helper.setFrom(fromAddress, "ALCAS - Universiti Utara Malaysia");
                helper.setTo(toEmail);
                helper.setSubject(subject);
                helper.setText(htmlContent, true);

                mailSender.send(message);
                log.info("[EMAIL SERVICE] Successfully dispatched email to {}", toEmail);
            } catch (Exception e) {
                log.warn("[EMAIL SERVICE] Could not send email to {} via SMTP ({}). Falling back gracefully.", toEmail, e.getMessage());
            }
        });
    }

    private String buildPasswordResetHtmlTemplate(String name, String email, String resetLink, String code) {
        return "<!DOCTYPE html>"
                + "<html lang=\"en\">"
                + "<head><meta charset=\"UTF-8\"><title>Reset Your Password</title></head>"
                + "<body style=\"margin:0; padding:0; background-color:#F1F5F9; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#1E293B;\">"
                + "  <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color:#F1F5F9; padding:40px 15px;\">"
                + "    <tr>"
                + "      <td align=\"center\">"
                + "        <table width=\"100%\" style=\"max-width:580px; background:#FFFFFF; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px -5px rgba(0,0,0,0.08); border:1px solid #E2E8F0;\" cellpadding=\"0\" cellspacing=\"0\">"
                + "          <!-- Header Banner -->"
                + "          <tr>"
                + "            <td style=\"background:linear-gradient(135deg, #0F766E 0%, #14B8A6 100%); padding:32px 30px; text-align:center;\">"
                + "              <h1 style=\"color:#FFFFFF; margin:0 0 6px; font-size:24px; font-weight:700; letter-spacing:0.5px;\">UNIVERSITI UTARA MALAYSIA</h1>"
                + "              <p style=\"color:#CCFBF1; margin:0; font-size:14px; font-weight:500; letter-spacing:1px; text-transform:uppercase;\">ALCAS Consultation Portal</p>"
                + "            </td>"
                + "          </tr>"
                + "          <!-- Main Body Content -->"
                + "          <tr>"
                + "            <td style=\"padding:36px 36px 28px;\">"
                + "              <h2 style=\"margin:0 0 16px; font-size:20px; color:#0F172A;\">Password Reset Request</h2>"
                + "              <p style=\"margin:0 0 16px; font-size:15px; line-height:1.6; color:#475569;\">"
                + "                Hello <strong>" + escapeHtml(name) + "</strong>,"
                + "              </p>"
                + "              <p style=\"margin:0 0 24px; font-size:15px; line-height:1.6; color:#475569;\">"
                + "                We received a request to reset the password for your ALCAS account registered with university email: "
                + "                <span style=\"color:#0F766E; font-weight:600;\">" + escapeHtml(email) + "</span>."
                + "              </p>"
                + "              <!-- CTA Reset Button -->"
                + "              <div style=\"text-align:center; margin:30px 0;\">"
                + "                <a href=\"" + resetLink + "\" target=\"_blank\" style=\"display:inline-block; background:linear-gradient(135deg, #0D9488 0%, #0F766E 100%); color:#FFFFFF; text-decoration:none; padding:14px 34px; font-size:15px; font-weight:600; border-radius:8px; box-shadow:0 4px 12px rgba(13,148,136,0.25);\">"
                + "                  Reset My Password"
                + "                </a>"
                + "              </div>"
                + "              <!-- Manual OTP Code Box -->"
                + "              <div style=\"background-color:#F8FAFC; border:1px dashed #CBD5E1; border-radius:8px; padding:18px; margin:24px 0; text-align:center;\">"
                + "                <p style=\"margin:0 0 8px; font-size:13px; color:#64748B; font-weight:500;\">Alternatively, enter this 6-digit verification code manually:</p>"
                + "                <span style=\"font-size:28px; font-weight:700; letter-spacing:6px; color:#0F766E;\">" + code + "</span>"
                + "              </div>"
                + "              <p style=\"margin:0 0 12px; font-size:13px; line-height:1.6; color:#64748B;\">"
                + "                If the button above does not open directly, copy and paste this link into your web browser:"
                + "              </p>"
                + "              <p style=\"margin:0 0 24px; font-size:12px; word-break:break-all; color:#0D9488; background:#F0FDFA; padding:10px; border-radius:6px;\">"
                + "                <a href=\"" + resetLink + "\" style=\"color:#0D9488; text-decoration:underline;\">" + resetLink + "</a>"
                + "              </p>"
                + "              <!-- Security Notice -->"
                + "              <div style=\"border-left:4px solid #EAB308; background:#FEFCE8; padding:12px 16px; border-radius:4px; margin-top:20px;\">"
                + "                <p style=\"margin:0; font-size:13px; color:#854D0E; line-height:1.5;\">"
                + "                  <strong>Notice:</strong> This password reset link and verification code are valid for <strong>10 minutes</strong>. If you did not request this change, please ignore this email. Your password remains safe and unchanged."
                + "                </p>"
                + "              </div>"
                + "            </td>"
                + "          </tr>"
                + "          <!-- Footer -->"
                + "          <tr>"
                + "            <td style=\"background-color:#F8FAFC; border-top:1px solid #E2E8F0; padding:20px 30px; text-align:center; font-size:12px; color:#94A3B8;\">"
                + "              <p style=\"margin:0 0 4px;\">Universiti Utara Malaysia (UUM) &bull; 06010 UUM Sintok, Kedah Darul Aman, Malaysia</p>"
                + "              <p style=\"margin:0;\">Academic Lecturer Consultation Appointment System (ALCAS)</p>"
                + "            </td>"
                + "          </tr>"
                + "        </table>"
                + "      </td>"
                + "    </tr>"
                + "  </table>"
                + "</body>"
                + "</html>";
    }

    private String buildAccountActivationHtmlTemplate(String name, String email, String code) {
        return "<!DOCTYPE html>"
                + "<html lang=\"en\">"
                + "<head><meta charset=\"UTF-8\"><title>Activate Your Account</title></head>"
                + "<body style=\"margin:0; padding:0; background-color:#F1F5F9; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color:#1E293B;\">"
                + "  <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"background-color:#F1F5F9; padding:40px 15px;\">"
                + "    <tr>"
                + "      <td align=\"center\">"
                + "        <table width=\"100%\" style=\"max-width:580px; background:#FFFFFF; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px -5px rgba(0,0,0,0.08); border:1px solid #E2E8F0;\" cellpadding=\"0\" cellspacing=\"0\">"
                + "          <tr>"
                + "            <td style=\"background:linear-gradient(135deg, #0F766E 0%, #14B8A6 100%); padding:28px; text-align:center;\">"
                + "              <h1 style=\"color:#FFFFFF; margin:0 0 4px; font-size:22px; font-weight:700;\">UNIVERSITI UTARA MALAYSIA</h1>"
                + "              <p style=\"color:#CCFBF1; margin:0; font-size:13px; letter-spacing:1px; text-transform:uppercase;\">ALCAS Account Activation</p>"
                + "            </td>"
                + "          </tr>"
                + "          <tr>"
                + "            <td style=\"padding:32px;\">"
                + "              <h2 style=\"margin:0 0 16px; font-size:18px; color:#0F172A;\">Welcome to ALCAS, " + escapeHtml(name) + "!</h2>"
                + "              <p style=\"margin:0 0 16px; font-size:14px; line-height:1.6; color:#475569;\">"
                + "                Thank you for registering with your university email address: <strong>" + escapeHtml(email) + "</strong>."
                + "              </p>"
                + "              <p style=\"margin:0 0 20px; font-size:14px; line-height:1.6; color:#475569;\">"
                + "                Please use the following 6-digit activation code to complete your registration:"
                + "              </p>"
                + "              <div style=\"background-color:#F0FDFA; border:2px dashed #2DD4BF; border-radius:8px; padding:18px; margin:20px 0; text-align:center;\">"
                + "                <span style=\"font-size:32px; font-weight:700; letter-spacing:8px; color:#0F766E;\">" + code + "</span>"
                + "              </div>"
                + "              <p style=\"margin:0; font-size:13px; color:#64748B;\">"
                + "                This verification code will expire in 10 minutes."
                + "              </p>"
                + "            </td>"
                + "          </tr>"
                + "        </table>"
                + "      </td>"
                + "    </tr>"
                + "  </table>"
                + "</body>"
                + "</html>";
    }

    private String buildBroadcastHtmlTemplate(String subject, String content) {
        return "<!DOCTYPE html>"
                + "<html lang=\"en\">"
                + "<body style=\"margin:0; padding:0; background-color:#F8FAFC; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\">"
                + "  <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"padding:30px 15px;\">"
                + "    <tr><td align=\"center\">"
                + "      <table width=\"100%\" style=\"max-width:600px; background:#FFFFFF; border-radius:8px; border:1px solid #E2E8F0; padding:24px;\">"
                + "        <tr><td style=\"border-bottom:2px solid #0F766E; padding-bottom:12px;\">"
                + "          <h2 style=\"margin:0; color:#0F766E; font-size:18px;\">ALCAS Official Notification</h2>"
                + "          <h3 style=\"margin:6px 0 0; color:#1E293B; font-size:16px;\">" + escapeHtml(subject) + "</h3>"
                + "        </td></tr>"
                + "        <tr><td style=\"padding:20px 0; color:#334155; font-size:14px; line-height:1.6;\">"
                + "          " + escapeHtml(content).replace("\n", "<br>")
                + "        </td></tr>"
                + "        <tr><td style=\"border-top:1px solid #E2E8F0; padding-top:12px; font-size:12px; color:#94A3B8; text-align:center;\">"
                + "          Universiti Utara Malaysia &bull; ALCAS Notification System"
                + "        </td></tr>"
                + "      </table>"
                + "    </td></tr>"
                + "  </table>"
                + "</body>"
                + "</html>";
    }

    private String escapeHtml(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }
}
