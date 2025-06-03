// ===== DATA STRUCTURE =====
// Cấu trúc dữ liệu chính cho toàn bộ website
let schoolData = {
    grades: {
        10: [
            { id: '10a1', name: '10A1', year: 2024, studentCount: 0, image: null },
            { id: '10a2', name: '10A2', year: 2024, studentCount: 0, image: null },
            { id: '10a3', name: '10A3', year: 2024, studentCount: 0, image: null },
            { id: '10a4', name: '10A4', year: 2024, studentCount: 0, image: null },
            { id: '10a5', name: '10A5', year: 2024, studentCount: 0, image: null }
        ],
        11: [
            { id: '11a1', name: '11A1', year: 2023, studentCount: 0, image: null },
            { id: '11a2', name: '11A2', year: 2023, studentCount: 0, image: null },
            { id: '11a3', name: '11A3', year: 2023, studentCount: 0, image: null },
            { id: '11a4', name: '11A4', year: 2023, studentCount: 0, image: null },
            { id: '11a5', name: '11A5', year: 2023, studentCount: 0, image: null }
        ],
        12: [
            { id: '12a1', name: '12A1', year: 2022, studentCount: 0, image: null },
            { id: '12a2', name: '12A2', year: 2022, studentCount: 0, image: null },
            { id: '12a3', name: '12A3', year: 2022, studentCount: 0, image: null },
            { id: '12a4', name: '12A4', year: 2022, studentCount: 0, image: null },
            { id: '12a5', name: '12A5', year: 2022, studentCount: 0, image: null }
        ]
    },
    students: [
        // Dữ liệu mẫu cho ranking
        { 
            id: 'hs001', 
            name: 'Nguyễn Văn A', 
            class: '11A3', 
            hearts: 125, 
            avatar: 'images/default-avatar.png',
            backgroundImage: null,
            description: 'Học sinh giỏi, tích cực tham gia hoạt động'
        },
        { 
            id: 'hs002', 
            name: 'Trần Thị B', 
            class: '12A1', 
            hearts: 98, 
            avatar: 'images/default-avatar.png',
            backgroundImage: null,
            description: 'Lớp trưởng năng động, có trách nhiệm'
        },
        { 
            id: 'hs003', 
            name: 'Lê Văn C', 
            class: '10A2', 
            hearts: 87, 
            avatar: 'images/default-avatar.png',
            backgroundImage: null,
            description: 'Thành viên tích cực của đội văn nghệ'
        }
    ],
    messages: [], // Tin nhắn từ bồ câu đưa thư
    ranking: [] // Top 10 được cập nhật tự động
};

// ===== UTILITY FUNCTIONS =====
// Lưu dữ liệu vào localStorage
function saveData() {
    try {
        // Lưu vào biến toàn cục thay vì localStorage
        window.schoolDataBackup = JSON.parse(JSON.stringify(schoolData));
        console.log('Dữ liệu đã được lưu');
    } catch (error) {
        console.error('Lỗi lưu dữ liệu:', error);
    }
}

// Tải dữ liệu từ localStorage
function loadData() {
    try {
        // Tải từ biến toàn cục thay vì localStorage
        if (window.schoolDataBackup) {
            schoolData = JSON.parse(JSON.stringify(window.schoolDataBackup));
            console.log('Dữ liệu đã được tải');
        }
    } catch (error) {
        console.error('Lỗi tải dữ liệu:', error);
    }
}

// Hiển thị loading
function showLoading() {
    document.getElementById('loading-overlay').classList.add('show');
}

// Ẩn loading
function hideLoading() {
    document.getElementById('loading-overlay').classList.remove('show');
}

// ===== GRADE & CLASS MANAGEMENT =====
// Cập nhật số lượng lớp cho từng khối
function updateGradeCount() {
    Object.keys(schoolData.grades).forEach(grade => {
        const count = schoolData.grades[grade].length;
        const element = document.getElementById(`grade-${grade}-count`);
        if (element) {
            element.textContent = `${count} lớp`;
        }
    });
}

// Hiển thị danh sách lớp khi click vào khối
function showClasses(grade) {
    const modal = document.getElementById('classes-modal');
    const title = document.getElementById('modal-title');
    const grid = document.getElementById('classes-grid');
    
    title.textContent = `Danh sách lớp khối ${grade}`;
    grid.innerHTML = '';
    
    // Tạo card cho từng lớp
    schoolData.grades[grade].forEach(classData => {
        const classCard = document.createElement('div');
        classCard.className = 'class-card';
        classCard.onclick = () => goToClass(classData.id);
        
        classCard.innerHTML = `
            <h4>${classData.name}</h4>
            <p>Niên khóa: ${classData.year}</p>
            <p>Học sinh: ${classData.studentCount}</p>
        `;
        
        grid.appendChild(classCard);
    });
    
    modal.classList.add('show');
}

// Đóng modal
function closeModal() {
    document.getElementById('classes-modal').classList.remove('show');
}

// Chuyển đến trang lớp học (sẽ implement sau)
function goToClass(classId) {
    // Tạm thời alert, sau này sẽ chuyển đến trang class.html
    alert(`Chuyển đến lớp: ${classId}\n(Tính năng này sẽ được phát triển trong giai đoạn tiếp theo)`);
    closeModal();
}

// ===== RANKING SYSTEM =====
// Cập nhật bảng xếp hạng idol
function updateRanking() {
    // Sắp xếp học sinh theo số tim giảm dần
    const sortedStudents = [...schoolData.students].sort((a, b) => b.hearts - a.hearts);
    schoolData.ranking = sortedStudents.slice(0, 10); // Lấy top 10
    
    // Cập nhật top 3
    for (let i = 1; i <= 3; i++) {
        const student = schoolData.ranking[i - 1];
        const element = document.getElementById(`rank-${i}`);
        
        if (student && element) {
            const avatar = element.querySelector('.idol-avatar');
            const name = element.querySelector('h4');
            const hearts = element.querySelector('.hearts span');
            
            avatar.src = student.avatar || 'images/default-avatar.png';
            avatar.alt = student.name;
            name.textContent = student.name;
            hearts.textContent = student.hearts;
        }
    }
    
    // Cập nhật top 4-10
    const remainingRanks = document.getElementById('remaining-ranks');
    remainingRanks.innerHTML = '';
    
    for (let i = 3; i < Math.min(10, schoolData.ranking.length); i++) {
        const student = schoolData.ranking[i];
        const card = document.createElement('div');
        card.className = 'idol-card';
        card.onclick = () => goToStudent(student.id);
        
        card.innerHTML = `
            <div class="rank-badge">${i + 1}</div>
            <img src="${student.avatar || 'images/default-avatar.png'}" alt="${student.name}" class="idol-avatar">
            <div>
                <h4>${student.name}</h4>
                <p>Lớp: ${student.class}</p>
                <div class="hearts">
                    <i class="fas fa-heart"></i>
                    <span>${student.hearts}</span>
                </div>
            </div>
        `;
        
        remainingRanks.appendChild(card);
    }
}

// Chuyển đến trang học sinh (sẽ implement sau)
function goToStudent(studentId) {
    alert(`Chuyển đến trang học sinh: ${studentId}\n(Tính năng này sẽ được phát triển trong giai đoạn tiếp theo)`);
}

// ===== MESSAGE SYSTEM =====
// Mở hộp thư bồ câu
function openMessageBox() {
    document.getElementById('message-modal').classList.add('show');
}

// Đóng hộp thư bồ câu
function closeMessageBox() {
    document.getElementById('message-modal').classList.remove('show');
    document.getElementById('message-form').reset();
}

// Gửi tin nhắn
function sendMessage(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const message = {
        id: 'msg_' + Date.now(),
        senderName: document.getElementById('sender-name').value,
        senderClass: document.getElementById('sender-class').value,
        content: document.getElementById('message-content').value,
        timestamp: new Date().toISOString(),
        status: 'unread'
    };
    
    // Hiển thị loading
    showLoading();
    
    // Giả lập gửi tin nhắn (delay 1.5s)
    setTimeout(() => {
        // Lưu tin nhắn vào dữ liệu
        schoolData.messages.push(message);
        saveData();
        
        // Ẩn loading và đóng modal
        hideLoading();
        closeMessageBox();
        
        // Hiển thị thông báo thành công
        showNotification('Tin nhắn đã được gửi thành công! Cảm ơn bạn đã chia sẻ.', 'success');
        
        console.log('Tin nhắn mới:', message);
    }, 1500);
}

// Hiển thị thông báo
function showNotification(message, type = 'info') {
    // Tạo element thông báo
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Thêm CSS cho notification nếu chưa có
    if (!document.querySelector('.notification-styles')) {
        const style = document.createElement('style');
        style.className = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--white);
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-hover);
                z-index: 4000;
                animation: slideInRight 0.3s ease;
                max-width: 350px;
            }
            .notification.success {
                border-left: 4px solid var(--success-color);
            }
            .notification.info {
                border-left: 4px solid var(--secondary-color);
            }
            .notification-content {
                padding: 15px 20px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification.success .fa-check-circle {
                color: var(--success-color);
            }
            .notification.info .fa-info-circle {
                color: var(--secondary-color);
            }
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Thêm vào DOM
    document.body.appendChild(notification);
    
    // Tự động xóa sau 3 giây
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ===== EVENT LISTENERS =====
// Đóng modal khi click ngoài
document.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.classList.remove('show');
        }
    });
});

// Đóng modal khi nhấn ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            modal.classList.remove('show');
        });
    }
});

// ===== INITIALIZATION =====
// Khởi tạo khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏫 THPT Trần Thánh Tông - Hệ thống đã khởi động');
    
    // Tải dữ liệu
    loadData();
    
    // Cập nhật giao diện
    updateGradeCount();
    updateRanking();
    
    // Lưu dữ liệu ban đầu
    saveData();
    
    console.log('✅ Khởi tạo hoàn tất');
    console.log('📊 Dữ liệu hiện tại:', schoolData);
});

// ===== ADMIN FUNCTIONS (Dành cho trang admin) =====
// Thêm lớp mới
function addClass(grade, className, year) {
    const newClass = {
        id: className.toLowerCase().replace(/\s+/g, ''),
        name: className,
        year: year,
        studentCount: 0,
        image: null
    };
    
    schoolData.grades[grade].push(newClass);
    saveData();
    updateGradeCount();
    
    console.log(`Đã thêm lớp ${className} vào khối ${grade}`);
}

// Thêm học sinh mới
function addStudent(studentData) {
    const newStudent = {
        id: 'hs' + Date.now(),
        name: studentData.name,
        class: studentData.class,
        hearts: 0,
        avatar: studentData.avatar || 'images/default-avatar.png',
        backgroundImage: studentData.backgroundImage || null,
        description: studentData.description || ''
    };
    
    schoolData.students.push(newStudent);
    
    // Cập nhật số lượng học sinh trong lớp
    const gradeNum = studentData.class.charAt(0) + studentData.class.charAt(1);
    const classObj = schoolData.grades[gradeNum]?.find(c => c.name === studentData.class);
    if (classObj) {
        classObj.studentCount++;
    }
    
    saveData();
    updateGradeCount();
    updateRanking();
    
    console.log('Đã thêm học sinh:', newStudent);
    return newStudent;
}

// Cập nhật số tim cho học sinh
function updateStudentHearts(studentId, increment = 1) {
    const student = schoolData.students.find(s => s.id === studentId);
    if (student) {
        student.hearts += increment;
        saveData();
        updateRanking();
        console.log(`Đã cập nhật tim cho ${student.name}: ${student.hearts}`);
    }
}

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
// Các hàm cần truy cập từ HTML
window.showClasses = showClasses;
window.closeModal = closeModal;
window.openMessageBox = openMessageBox;
window.closeMessageBox = closeMessageBox;
window.sendMessage = sendMessage;
window.goToClass = goToClass;
window.goToStudent = goToStudent;

// Các hàm dành cho admin và các trang khác
window.schoolData = schoolData;
window.addClass = addClass;
window.addStudent = addStudent;
window.updateStudentHearts = updateStudentHearts;
window.saveData = saveData;
window.loadData = loadData;
