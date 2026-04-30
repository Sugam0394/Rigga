import { sendWhatsAppMessage } from './twilioServices.js';
import { generateAIReply } from './aiServices.js';
import logger from '../utils/logger.js';

 
export const executeEscalation = async (taskBox, user) => {
  const level = taskBox.level || 1;
  const timestamp = new Date();

  try {
    if (level === 1) {
      // 🔥 LEVEL 1: BRUTAL ROAST
      const roastMsg = await generateAIReply(
        `User FAILED: ${taskBox.goal}. No proof submitted. ROAST THEM.`,
        { name: user.name, goal: taskBox.goal, level: 1 }
      );
      await sendWhatsAppMessage(user.whatsappNumber, roastMsg);
      logger.info(`🔥 Level 1 Roast sent to ${user.name}`);

    } else if (level === 2) {
      // 💰 LEVEL 2: PENALTY THREAT
      const penaltyMsg = `🚨 *LEVEL 2 ACTIVATED* 🚨\n\n${user.name}, tune goal miss kiya: "${taskBox.goal}"\n\nAb seedhe raste aa ja warna agla message tere Witness ko jayega aur ₹500 fine katega! 😤`;
      await sendWhatsAppMessage(user.whatsappNumber, penaltyMsg);
      logger.info(`💰 Level 2 Penalty threat sent to ${user.name}`);

    } else if (level === 3) {
      // 👥 LEVEL 3: WITNESS ALERT (Social Suicide)
      if (taskBox.witness && taskBox.witness.phone) {
        const witnessMsg = `🚨 *RIGGA REPORT* 🚨\n\n${user.name} ne apna vaada toda! Goal: "${taskBox.goal}".\n\nLevel 3 failure hai, iska stake (Photo/Secret) ab aapke hawale kiya ja sakta hai. 😈`;
        await sendWhatsAppMessage(taskBox.witness.phone, witnessMsg);
        
        taskBox.witness.notified = true;
        logger.info(`👥 Level 3 Witness notified for ${user.name}`);
      }

    } else if (level === 4) {
      // 💀 LEVEL 4: FINAL LEAK
      const finalMsg = `💀 *GAME OVER* 💀\n\n${user.name} has reached Level 4 Failure.\nGoal: "${taskBox.goal}"\n\nStake Leaked: ${taskBox.stakeUrl}\n\nRIP Reputation. 🪦`;
      
      if (taskBox.witness && taskBox.witness.phone) {
        await sendWhatsAppMessage(taskBox.witness.phone, finalMsg);
      }
      await sendWhatsAppMessage(user.whatsappNumber, finalMsg);
      logger.info(`💀 Level 4 Final leak executed for ${user.name}`);
    }

    // Log the escalation in TaskBox
    taskBox.escalationLog.push({
      at: timestamp,
      action: `level_${level}_escalation`,
      outcome: "executed"
    });

  } catch (err) {
    logger.error(`❌ Escalation Error (Level ${level}):`, err.message);
  }
};