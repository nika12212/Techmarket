from flask import render_template, redirect, url_for, request, abort, flash
from flask_login import login_user, login_required, logout_user, current_user
from sqlalchemy.exc import IntegrityError
from forms import UserInfoForm
from ext import app, db
from model import UserInfo, User
from utils import save_uploaded_file
@app.route('/')
def base():
    return render_template('base.html')



@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if not username or not password:
            flash('Please enter both username and password.', 'danger')
        else:
            try:
                new_user = User(username=username, password=password)
                db.session.add(new_user)
                db.session.commit()

                flash('Registration successful! You can now log in.', 'success')
                return redirect(url_for('login'))
            except IntegrityError:
                db.session.rollback()
                flash('Username already exists. Please choose a different username.', 'danger')

    return render_template('register.html')


@app.route('/index')
def index():
    user_authenticated = current_user.is_authenticated
    return render_template('index.html', user_authenticated=user_authenticated)


@app.route('/prod-base')
def prodbase():
    added_products_list = UserInfo.query.all()
    return render_template('prod_base.html', user_infos=added_products_list)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()

        if user and user.password == password:
            login_user(user)

            return redirect(url_for('index'))
        else:
            flash('Invalid username or password. Please try again.', 'danger')

    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('base'))


@app.route('/sign_up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        return redirect(url_for('base'))

    return render_template('sign_up.html')


@app.route('/remove-product/<int:product_id>', methods=['POST'])
@login_required
def remove_product(product_id):
    product = UserInfo.query.get(product_id)


    if not product:
        abort(404)


    if not current_user.is_authenticated:
        abort(401)
    db.session.delete(product)
    db.session.commit()



    return redirect(url_for('added_products'))

@app.route('/added_products')
def added_products():
    user_infos = UserInfo.query.all()
    user_authenticated = current_user.is_authenticated


    show_delete_buttons = user_authenticated and current_user.username == "Admin" and current_user.password == "nika"

    return render_template('added_products.html', user_infos=user_infos, user_authenticated=user_authenticated,
                           show_delete_buttons=show_delete_buttons)
@app.route('/add_products', methods=['GET', 'POST'])
def add_products():
    user_authenticated = current_user.is_authenticated

    form = UserInfoForm()

    if form.validate_on_submit():
        name = form.name.data
        category = form.category.data
        price = form.price.data
        description = form.description.data
        item_condition = form.item_condition.data
        email = form.email.data
        image_filename = save_uploaded_file(form.image.data)

        new_product = UserInfo(
            name=name,
            category=category,
            price=price,
            description=description,
            item_condition=item_condition,
            email=email,
            image=image_filename
        )

        db.session.add(new_product)
        db.session.commit()

        return redirect(url_for('added_products'))

    return render_template('add_products.html', form=form, user_authenticated=user_authenticated)
