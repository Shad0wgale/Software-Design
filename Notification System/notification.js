function showNotification(notificationmessage) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = notificationmessage; //notification variable, this will be changed according to specific notification
    
    // Add the notification to the container
    const container = document.getElementById('notificationContainer');
    container.appendChild(notification);
    
    // Show the notification
    notification.style.display = 'block';
    
    // Automatically hide after 3 seconds (adjust as needed)
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }
  