'use strict';
require('dotenv').config();

var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var cors          = require('cors');

// ─────────────────────────────────────────────
//  API v1 — tous les modules
// ─────────────────────────────────────────────
var authRouter               = require('./routes/auth');
var userRouter               = require('./routes/user');
var roleRouter               = require('./routes/role');
var permissionRouter         = require('./routes/permission');
var academicYearRouter       = require('./routes/academic-year');
var termRouter               = require('./routes/term');
var classRouter              = require('./routes/class');
var subjectRouter            = require('./routes/subject');
var classSubjectRouter       = require('./routes/class-subject');
var scheduleRouter           = require('./routes/schedule');
var examRouter               = require('./routes/exam');
var gradeRouter              = require('./routes/grade');
var reportCardRouter         = require('./routes/report-card');
var studentRouter            = require('./routes/student');
var parentRouter             = require('./routes/parent');
var enrollmentRouter         = require('./routes/enrollment');
var attendanceRouter         = require('./routes/attendance');
var employeeRouter           = require('./routes/employee');
var payrollRouter            = require('./routes/payroll');
var leaveRouter              = require('./routes/leave');
var evaluationRouter         = require('./routes/evaluation');
var jobPostingRouter         = require('./routes/job-posting');
var transactionRouter        = require('./routes/transaction');
var feeRouter                = require('./routes/fee');
var feePaymentRouter         = require('./routes/fee-payment');
var budgetLineRouter         = require('./routes/budget-line');
var assetRouter              = require('./routes/asset');
var canteenSubscriptionRouter= require('./routes/canteen-subscription');
var canteenMenuRouter        = require('./routes/canteen-menu');
var canteenAttendanceRouter  = require('./routes/canteen-attendance');
var transportRouteRouter     = require('./routes/transport-route');
var bookRouter               = require('./routes/book');
var bookLoanRouter           = require('./routes/book-loan');
var bookReservationRouter    = require('./routes/book-reservation');
var healthRecordRouter       = require('./routes/health-record');
var infirmaryVisitRouter     = require('./routes/infirmary-visit');
var medicalStockRouter       = require('./routes/medical-stock');
var roomRouter               = require('./routes/room');
var roomReservationRouter    = require('./routes/room-reservation');
var clubRouter               = require('./routes/club');
var clubMemberRouter         = require('./routes/club-member');
var eventRouter              = require('./routes/event');
var messageRouter            = require('./routes/message');
var notificationRouter       = require('./routes/notification');
var parentMeetingRouter      = require('./routes/parent-meeting');
var councilRouter            = require('./routes/council');
var councilDecisionRouter    = require('./routes/council-decision');
var activityLogRouter        = require('./routes/activity-log');
var teacherRouter             = require('./routes/teacher-route');
var teacherQualificationRouter = require('./routes/teacher-qualification-route');
var studentParentRouter      = require('./routes/studentParentRoute');
var uploadRouter              = require('./routes/uploadRoutes');
var app = express();

// ─────────────────────────────────────────────
//  View engine (express-generator — conservé)
// ─────────────────────────────────────────────
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// ─────────────────────────────────────────────
//  Middlewares globaux
// ─────────────────────────────────────────────
app.use(cors({
  origin:      process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Logs colorés en dev, concis en prod
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ─────────────────────────────────────────────
//  Health check (sans auth)
// ─────────────────────────────────────────────
app.get('/api/v1/health', (req, res) => {
  res.json({
    success:     true,
    message:     'EduManage Pro API opérationnelle',
    version:     '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp:   new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────
//  Routes API v1
// ─────────────────────────────────────────────
var API = '/api/v1';

// Auth (login, me, logout, change-password)
app.use(API + '/auth',                  authRouter);

// Utilisateurs & Accès
app.use(API + '/users',                 userRouter);
app.use(API + '/roles',                 roleRouter);
app.use(API + '/permissions',           permissionRouter);

// Académique
app.use(API + '/academic-years',        academicYearRouter);
app.use(API + '/terms',                 termRouter);
app.use(API + '/classes',               classRouter);
app.use(API + '/subjects',              subjectRouter);
app.use(API + '/class-subjects',        classSubjectRouter);
app.use(API + '/schedules',             scheduleRouter);
app.use(API + '/exams',                 examRouter);
app.use(API + '/grades',                gradeRouter);
app.use(API + '/report-cards',          reportCardRouter);

// Élèves & Familles
app.use(API + '/students',              studentRouter);
app.use(API + '/parents',               parentRouter);
app.use(API + '/enrollments',           enrollmentRouter);
app.use(API + '/attendances',           attendanceRouter);
app.use(API + '/students/:studentId/parents', studentParentRouter); // <-- route pour gérer les associations étudiants-parents

// Ressources Humaines
app.use(API + '/employees',             employeeRouter);
app.use(API + '/payrolls',              payrollRouter);
app.use(API + '/leaves',                leaveRouter);
app.use(API + '/evaluations',           evaluationRouter);
app.use(API + '/job-postings',          jobPostingRouter);

// Finances
app.use(API + '/transactions',          transactionRouter);
app.use(API + '/fees',                  feeRouter);
app.use(API + '/fee-payments',          feePaymentRouter);
app.use(API + '/budget-lines',          budgetLineRouter);
app.use(API + '/assets',                assetRouter);

// Cantine & Transport
app.use(API + '/canteen-subscriptions', canteenSubscriptionRouter);
app.use(API + '/canteen-menus',         canteenMenuRouter);
app.use(API + '/canteen-attendances',   canteenAttendanceRouter);
app.use(API + '/transport-routes',      transportRouteRouter);

// Bibliothèque
app.use(API + '/books',                 bookRouter);
app.use(API + '/book-loans',            bookLoanRouter);
app.use(API + '/book-reservations',     bookReservationRouter);

// Infirmerie & Santé
app.use(API + '/health-records',        healthRecordRouter);
app.use(API + '/infirmary-visits',      infirmaryVisitRouter);
app.use(API + '/medical-stocks',        medicalStockRouter);

// Salles & Ressources
app.use(API + '/rooms',                 roomRouter);
app.use(API + '/room-reservations',     roomReservationRouter);

// Activités Parascolaires
app.use(API + '/clubs',                 clubRouter);
app.use(API + '/club-members',          clubMemberRouter);
app.use(API + '/events',               eventRouter);

// Communication
app.use(API + '/messages',             messageRouter);
app.use(API + '/notifications',        notificationRouter);
app.use(API + '/parent-meetings',      parentMeetingRouter);

// Conseil de Classe
app.use(API + '/councils',             councilRouter);
app.use(API + '/council-decisions',    councilDecisionRouter);

// Qualifications des enseignants
app.use(API + '/teacher-qualifications', teacherQualificationRouter);

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Upload de photos
app.use(API + '/upload',               uploadRouter);
// Logs système
app.use(API + '/activity-logs',        activityLogRouter);
app.use(API + '/teachers',             teacherRouter);

// ─────────────────────────────────────────────
//  404 — route inconnue
// ─────────────────────────────────────────────
app.use(function (req, res, next) {
  // Si l'URL commence par /api → réponse JSON
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: 'Route introuvable : ' + req.method + ' ' + req.originalUrl,
    });
  }
  next(createError(404));
});

// ─────────────────────────────────────────────
//  Gestionnaire d'erreurs global
// ─────────────────────────────────────────────
app.use(function (err, req, res, next) {
  // Log complet en console (toujours)
  console.error('\n[ERREUR]', err.status || 500, '-', err.message);
  if (process.env.NODE_ENV !== 'production') console.error(err.stack);

  // Réponses JSON pour les routes API
  if (req.path.startsWith('/api')) {
    var { ValidationError, UniqueConstraintError, ForeignKeyConstraintError } = require('sequelize');

    if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
      return res.status(422).json({
        success: false,
        message: 'Données invalides',
        errors:  err.errors.map(function(e) { return { field: e.path, message: e.message }; }),
      });
    }
    if (err instanceof ForeignKeyConstraintError) {
      return res.status(409).json({ success: false, message: 'Contrainte de référence violée' });
    }

    return res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Erreur serveur interne',
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    });
  }

  // Rendu HTML pour les pages (express-generator)
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
