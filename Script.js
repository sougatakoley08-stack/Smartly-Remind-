// Prevent repeated notifications
let lastNotification = {};


// Check reminders every 10 seconds
setInterval(function () {

    const now = new Date();

    const currentHour = String(now.getHours()).padStart(2, "0");
    const currentMinute = String(now.getMinutes()).padStart(2, "0");

    const currentTime = currentHour + ":" + currentMinute;

    reminders.forEach(function (reminder) {

        if (
            currentTime >= reminder.startTime &&
            currentTime <= reminder.endTime
        ) {

            const startParts = reminder.startTime.split(":");

            const startHour = Number(startParts[0]);
            const startMinute = Number(startParts[1]);

            const startTotalMinutes =
                startHour * 60 + startMinute;

            const currentTotalMinutes =
                now.getHours() * 60 +
                now.getMinutes();

            const difference =
                currentTotalMinutes - startTotalMinutes;


            if (
                difference >= 0 &&
                difference % reminder.interval === 0
            ) {

                const notificationKey =
                    reminder.id + "-" + currentTotalMinutes;


                if (lastNotification[reminder.id] !== notificationKey) {

                    if (
                        "Notification" in window &&
                        Notification.permission === "granted"
                    ) {

                        new Notification("🔔 Daily Reminder", {
                            body: "Time to: " + reminder.task
                        });

                    }

                    lastNotification[reminder.id] =
                        notificationKey;

                }

            }

        }

    });

}, 10000);