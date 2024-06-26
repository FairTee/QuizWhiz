from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from .models import Quiz, Question, UserQuizResult

@login_required
def home(request):
    quizzes = Quiz.objects.all()
    return render(request, 'home.html', {'quizzes': quizzes})

@login_required
def quiz_detail(request, quiz_id):
    quiz = Quiz.objects.get(id=quiz_id)
    questions = Question.objects.filter(quiz=quiz)
    if request.method == 'POST':
        score = 0
        for question in questions:
            selected_option = request.POST.get(str(question.id))
            if selected_option and int(selected_option) == question.correct_option:
                score += 1
        result = UserQuizResult(user=request.user, quiz=quiz, score=score)
        result.save()
        return redirect('quiz_result', result_id=result.id)
    return render(request, 'quiz_detail.html', {'quiz': quiz, 'questions': questions})

@login_required
def quiz_result(request, result_id):
    result = UserQuizResult.objects.get(id=result_id)
    return render(request, 'quiz_result.html', {'result': result})
