from flask import Flask, render_template, request, redirect, url_for, flash, session
import json
import os

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta'

def load_users():
    if os.path.exists('dados.json'):
        with open('dados.json', 'r', encoding='utf-8') as file:
            try:
                return json.load(file)
            except json.JSONDecodeError:
                return []
    return []

def save_users(users):
    with open('dados.json', 'w', encoding='utf-8') as file:
        json.dump(users, file, indent=4, ensure_ascii=False)

@app.route('/')
def index():
    user_info = None
    if session.get('logged_in'):
        user_info = {
            'nome': session.get('nome'),
            'idade': session.get('idade'),
            'email': session.get('email')
        }
    return render_template('index1.html', logged_in=session.get('logged_in', False), user_info=user_info)

@app.route('/cadastro')
def cadastro():
    return render_template('index.html')

@app.route('/cadastrar', methods=['POST'])
def cadastrar():
    nome = request.form['nome']
    idade = request.form['idade']
    email = request.form['email']
    senha = request.form['senha']

    users = load_users()
    if any(user['email'] == email for user in users):
        flash('Este email já está cadastrado. Por favor, use outro email.', 'error')
        return redirect(url_for('cadastro'))

    users.append({'nome': nome, 'idade': idade, 'email': email, 'senha': senha})
    save_users(users)

    flash('Cadastro realizado com sucesso!', 'success')
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']

        users = load_users()
        user = next((u for u in users if u['email'] == email and u['senha'] == senha), None)

        if user:
            session['logged_in'] = True
            session['nome'] = user['nome']
            session['idade'] = user['idade']
            session['email'] = user['email']
            return redirect(url_for('index'))
        else:
            flash('Credenciais incorretas. Por favor, tente novamente.', 'error')
            return redirect(url_for('login'))
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('nome', None)
    session.pop('idade', None)
    session.pop('email', None)
    return redirect(url_for('index'))

@app.route('/sobre')
def sobre():
    return render_template('sobre.html')

@app.route('/contato')
def contato():
    return render_template('contato.html')

@app.route('/receita')
def receitas():
    return render_template('receitas.html')

@app.route('/receitas', methods=['GET'])
def load_receitas():
    if os.path.exists('receita.json'):
        with open('receita.json', 'r', encoding='utf-8') as file:
            try:
                return json.load(file)
            except json.JSONDecodeError:
                return []
    return []

@app.route('/calculadora')
def calculadora():
    return render_template('calculadora.html')

@app.route('/artigos')
def artigos():
    return render_template('artigos.html')

@app.route('/favoritos')
def favoritos():
    return render_template('favoritos.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
